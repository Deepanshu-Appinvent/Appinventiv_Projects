import { Context } from "koa";
import { routeService } from "../services/routeService";

export class routeController {
  static async addRoute(ctx: Context): Promise<any> {
    const {
      routeName,
      startingStation,
      endingStation,
      distance,
      farecalc,
      estimatedDuration,
      stops,
    } = ctx.request.body as {
      routeName: string;
      startingStation: string;
      endingStation: string;
      distance: number;
      farecalc: number;
      estimatedDuration: number;
      stops: string[];
    };
    const adminID = ctx.state.adminId;
    const Route = await routeService.createroute({
      adminID,
      routeName,
      startingStation,
      endingStation,
      distance,
      farecalc,
      estimatedDuration,
      stops,
    });
    ctx.body = { message: "Route added successfully", route: Route };
  }

  static async routeList(ctx: Context) {
    const adminID = ctx.state.adminId;
    const routeList = await routeService.getRouteList(adminID);
    ctx.body = { message: "Routes list fetched successfully", routeList };
  }

  static async routeDetails(ctx: Context) {
    const { routeId } = ctx.params;
    const route = await routeService.getRouteDetails(Number(routeId));
    ctx.body = { message: "Route details fetched successfully", route };
  }
}
