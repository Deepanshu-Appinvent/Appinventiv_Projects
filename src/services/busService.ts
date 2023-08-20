import { Bus } from "../database/models/bus.model";
import { Route } from "../database/models/routeModel";
import { Driver } from "../database/models/driver.Model";

export async function addBusService(
  busData: any,
  adminId: string
): Promise<any> {
  try {
    console.log("error");
    const newBus = await Bus.create({
      ...busData,
      adminId,
      driverID: busData.driverId,
    });
    return newBus;
  } catch (error) {
    console.log(error);
    throw new Error("Error while adding a bus");
  }
}

export async function assignBusToDriver(
  driverId: number,
  busId: number
): Promise<any> {
  try {
    const driver = await Driver.findByPk(driverId);
    const bus = await Bus.findByPk(busId);

    if (!driver || !bus) {
      return false;
    }
    //await driver.setBus(bus);
    // await bus.update({ driverId });
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
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while assigning bus to driver");
  }
}

export async function assignBusToRoute(
  routeId: number,
  busId: number
): Promise<any> {
  try {
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
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while assigning bus to route");
  }
}

export async function getBusList(adminID: string): Promise<any[]> {
  try {
    const busList = await Bus.findAll({ where: { adminID } });
    return busList;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching buses list");
  }
}

export async function getBusDetails(busId: number): Promise<any> {
  try {
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
      throw new Error("Bus not found");
    }
    return bus;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching bus details");
  }
}

export async function getAssignedBusDetails(driverId: number): Promise<any> {
  try {
    const driver = await Driver.findByPk(driverId);

    if (!driver) {
      return null;
    }

    const bus = await Bus.findOne({ where: { driverID: driver.id } });
    return bus;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching assigned bus details");
  }
}
