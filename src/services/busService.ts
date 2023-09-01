import { Bus } from "../database/models/bus.model";
import { Route } from "../database/models/routeModel";
import AppError from "../middleware/AppError";
import busEntity from "../entities/busEntity";
import amqp from "amqplib";
import { Driver } from "../database/models/driver.Model";

export class busService {
  static async addBusService(busData: any): Promise<any> {
    return busEntity.addBusService(busData);
  }

  static async assignBusToDriver(
    driverId: number,
    busId: number
  ): Promise<any> {
    const driver = await Driver.findByPk(driverId);
    const bus = await Bus.findByPk(busId);
    if (bus?.driverID) {
      throw new AppError("Driver for this bus is already selected", 401);
    }
    if (!driver || !bus) {
      return false;
    }

    bus.driverID = driverId;
    await bus.save();
    const driverName = driver.driverName;
    const busName = bus.busName;

    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queueName = "busAssign_queue";
    await channel.assertQueue(queueName, { durable: true });

    const assignData = {
      driverId,
      driverName,
      busId,
      busName,
      email: driver.email,
      capacity: bus.capacity,
      busModel: bus.model,
      plate: bus.registrationNumber,
    };

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(assignData)), {
      persistent: true,
    });

    await channel.close();
    await connection.close();

    return {
      success: true,
      message: "Bus assigned to driver successfully",
      driverName,
      busName,
    };
  }

  static async assignBusToRoute(routeId: number, busId: number): Promise<any> {
    const route = await Route.findByPk(routeId);
    const bus = await Bus.findByPk(busId);
    if (bus?.routeID) {
      throw new AppError("Route for this bus is already selected", 401);
    }
    if (!route || !bus) {
      return false;
    }
    bus.routeID = routeId;
    await bus.save();
    const routeName = route.routeName;
    const busName = bus.busName;

    return {
      success: true,
      message: "Bus assigned to route successfully",
      routeName,
      busName,
    };
  }

  static async getBusList(adminID: string): Promise<any[]> {
    return busEntity.getBusList(adminID);
  }

  static async getBusDetails(busId: number): Promise<any> {
    const bus = await Bus.findByPk(busId, {
      include: [
        { model: Driver, as: "driver", attributes: ["id", "driverName"] },
        { model: Route, as: "route", attributes: ["id", "routeName"] },
      ],
      attributes: {
        exclude: ["driverID", "routeID"],
      },
    });
    if (!bus) {
      throw new AppError("Bus not found", 404);
    }
    return bus;
  }

  static async getAssignedBusDetails(driverId: number): Promise<any> {
    return busEntity.getAssignedBusDetails(driverId);
  }
  static async delBus(busId: number): Promise<any> {
    const bus = await busEntity.findBusById(busId);
    await busEntity.removeBus(bus);
    return {
      status: 200,
      body: { message: `Bus ${bus.busName} removed successfully` },
    };
  }
}
