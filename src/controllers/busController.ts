import { Context } from "koa";
import {busService} from "../services/busService";
import {AddBus, AssignBus, AssignRoute} from "../utils/interface/Interface";

export class busController {
  static async addBus(ctx: Context) {
    const {busName,capacity,manufacturer,model,year,registrationNumber,insuranceExpiryDate,driverID,routeID} = ctx.request.body as AddBus
    const adminID = ctx.state.adminId;
    const bus = await busService.addBusService({busName,capacity,manufacturer,model,year,registrationNumber,insuranceExpiryDate,driverID,adminID,routeID});
    ctx.body = { message: "Bus added successfully", bus };
  }

  static async assignBus(ctx: Context) {
    const { driverId, busId } = ctx.request.body as AssignBus
    const result = await busService.assignBusToDriver(driverId, busId);
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
  }

  static async assignRoute(ctx: Context): Promise<void> {
    const { routeId, busId } = ctx.request.body as AssignRoute
    const result = await busService.assignBusToRoute(routeId, busId);
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
  }

  static async busList(ctx: Context) {
    const adminID = ctx.state.adminId;
    const busList = await busService.getBusList(adminID);
    ctx.body = { message: "Buses list while fetching buses list" ,busList};
  }

  static async busDetails(ctx: Context) {
    const { busId } = ctx.params;
    const bus = await busService.getBusDetails(Number(busId));
    ctx.body = { message: "Bus details fetched successfully", bus };
  }

  static async assignedBusDetails(ctx: Context): Promise<void> {
    const driverId = ctx.params.driverId;
    const bus = await busService.getAssignedBusDetails(driverId);
    if (!bus) {
      ctx.status = 404;
      ctx.body = { message: "No assigned bus found for this driver" };
      return;
    }
    ctx.body = {
      message: "Assigned bus details for driver fetched successfully",
      bus,
    };
  }
  static async delBusController(ctx: Context): Promise<any> {
    const busId = ctx.params.busId;
    const driver = await busService.delBus(busId);
    ctx.status = driver.status;
    ctx.body = driver.body;
  }
}
