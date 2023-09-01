import { Route } from "../database/models/routeModel";
import BaseEntity from "./baseEntity";
import logger from "../logger/logger";
import AppError from "../middleware/AppError";
class RouteEntity extends BaseEntity {
  constructor() {
    super(Route);
  }

  async findRouteByName(routeName: string): Promise<any | null> {
    const route = await this.findOneWhere({ routeName });
    if (route) {
      logger.error("Route Already Exist");
      throw new AppError("Route Already Exist", 400);
    }
    return route;
  }

  async findRouteById(routeId: number): Promise<any | null> {
    const route = await this.findByPk(routeId);
    if (!route) {
      logger.error("Route not found");
      throw new AppError("Route not found", 404);
    }
    return route;
  }
  async createNewRoute(routeData: any): Promise<any> {
    const newRoute = await this.createEntity(routeData);
    return newRoute;
  }
  async getRoutesByAdmin(adminID: string): Promise<any[]> {
    const routeList = await this.findAllWhere({ adminID });
    return routeList;
  }
  async removeRoute(routeId: number) {
    await this.destroy(routeId);
    return routeId;
  }
}

export const routeEntity = new RouteEntity();
export default routeEntity;
