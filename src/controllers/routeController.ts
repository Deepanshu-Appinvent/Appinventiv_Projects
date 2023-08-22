import { Context } from "koa";
import {
  createroute,
  getRouteList,
  getRouteDetails,
} from "../services/routeService";

export async function addRoute(ctx: Context): Promise<any> {
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
  try {
    const Route = await createroute({
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
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while adding the route" };
  }
}

export async function routeList(ctx: Context) {
  try {
    const adminID = ctx.state.adminId;
    const routeList = await getRouteList(adminID);
    ctx.body = { message: "Routes list fetched successfully", routeList };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while fetching routes list" };
  }
}

export async function routeDetails(ctx: Context) {
  try {
    const { routeId } = ctx.params;
    const route = await getRouteDetails(Number(routeId));
    ctx.body = { message: "Route details fetched successfully", route };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while fetching route details" };
  }
}
