import { Route } from "../database/models/routeModel";

export async function createroute(
  routeData: any,
  adminId: string
): Promise<any> {
  try {
    const newRoute = await Route.create({
      ...routeData,
      adminId,
    });
    return newRoute;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while adding the route");
  }
}

export async function getRouteList(adminID: string): Promise<any[]> {
  try {
    const routeList = await Route.findAll({ where: { adminID } });
    return routeList;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching routes list");
  }
}

export async function getRouteDetails(routeId: number): Promise<any> {
  try {
    const route = await Route.findByPk(routeId);
    if (!route) {
      throw new Error("Route not found");
    }
    return route;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching route details");
  }
}
