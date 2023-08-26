import { Route } from "../database/models/routeModel";
import AppError from "../middleware/AppError";

export class routeService {
  static async createroute(routeData: any): Promise<any> {
    const newRoute = await Route.create({
      ...routeData,
    });
    return newRoute;
  }

  static async getRouteList(adminID: string): Promise<any[]> {
    const routeList = await Route.findAll({ where: { adminID } });
    return routeList;
  }

  static async getRouteDetails(routeId: number): Promise<any> {
    const route = await Route.findByPk(routeId);
    if (!route) {
      throw new AppError("Route not found", 404);
    }
    return route;
  }
}
