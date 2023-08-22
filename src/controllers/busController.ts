import { Context } from "koa";
import {
  assignBusToDriver,
  assignBusToRoute,
  addBusService,
  getBusList,
  getAssignedBusDetails,
  getBusDetails,
} from "../services/busService";

export async function addBus(ctx: Context): Promise<any> {
  const {
    busName,
    capacity,
    manufacturer,
    model,
    year,
    registrationNumber,
    insuranceExpiryDate,
    driverID,
    routeID,
  } = ctx.request.body as {
    busName: string;
    capacity: number;
    manufacturer: string;
    model: string;
    year: string;
    registrationNumber: string;
    insuranceExpiryDate: string;
    driverID: number;
    routeID: number;
  };
  const adminID = ctx.state.adminId;

  try {
    const bus = await addBusService({
      busName,
      capacity,
      manufacturer,
      model,
      year,
      registrationNumber,
      insuranceExpiryDate,
      driverID,
      adminID,
      routeID,
    });
    ctx.body = { message: "Bus added successfully", bus };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while adding Bus" };
  }
}

export async function assignBus(ctx: Context): Promise<void> {
  const { driverId, busId } = ctx.request.body as {
    driverId: number;
    busId: number;
  };
  try {
    const result = await assignBusToDriver(driverId, busId);
    if (result.success) {
      ctx.body = {
        message: result.message,
        driverName: result.driverName,
        busName: result.busName,
      };
    } else {
      ctx.status = 404;
      ctx.body = { message: "Driver or bus not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while assigning bus to driver" };
  }
}

export async function assignRoute(ctx: Context): Promise<void> {
  const { routeId, busId } = ctx.request.body as {
    routeId: number;
    busId: number;
  };
  try {
    const result = await assignBusToRoute(routeId, busId);
    if (result.success) {
      ctx.body = {
        message: result.message,
        routeName: result.routeName,
        busName: result.busName,
      };
    } else {
      ctx.status = 404;
      ctx.body = { message: "Route or bus not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while assigning bus to Route" };
  }
}

export async function busList(ctx: Context) {
  try {
    const adminID = ctx.state.adminId;
    const busList = await getBusList(adminID);
    ctx.body = { message: "Buses list fetched successfully", busList };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: "An error occurred while fetching buses list" };
  }
}

export async function busDetails(ctx: Context) {
  try {
    const { busId } = ctx.params;
    const bus = await getBusDetails(Number(busId));
    ctx.body = { message: "Bus details fetched successfully", bus };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while fetching bus details" };
  }
}

export async function assignedBusDetails(ctx: Context): Promise<void> {
  const driverId = ctx.params.driverId;
  try {
    const bus = await getAssignedBusDetails(driverId);
    if (!bus) {
      ctx.status = 404;
      ctx.body = { message: "No assigned bus found for this driver" };
      return;
    }
    ctx.body = {
      message: "Assigned bus details for driver fetched successfully",
      bus,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error: "An error occurred while fetching assigned bus details",
    };
  }
}
