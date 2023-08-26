import { Bus } from "../database/models/bus.model";
import { Route } from "../database/models/routeModel";
import AppError from "../middleware/AppError";
import { Driver } from "../database/models/driver.Model";
import { stat } from "fs";

export class busService {
  static async addBusService(busData: any): Promise<any> {
    const newBus = await Bus.create({
      ...busData,
    });
    return newBus;
  }

  static async assignBusToDriver(
    driverId: number,
    busId: number
  ): Promise<any> {
    const driver = await Driver.findByPk(driverId);
    const bus = await Bus.findByPk(busId);

    if (!driver || !bus) {
      return false;
    }
    bus.driverID = driverId;
    await bus.save();
    const driverName = driver.driverName;
    const busName = bus.busName;

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
    const busList = await Bus.findAll({ where: { adminID } });
    return busList;
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
    const driver = await Driver.findByPk(driverId);

    if (!driver) {
      return null;
    }

    const bus = await Bus.findOne({ where: { driverID: driver.id } });
    return bus;
  }
}
