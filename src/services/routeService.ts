import routeEntity from "../entities/routeEntity";

export class routeService {
  static async createroute(routeData: any): Promise<any> {
    await routeEntity.findRouteByName(routeData.routeName);
    const newRoute = await routeEntity.createNewRoute(routeData);
    return newRoute;
  }

  static async getRouteList(adminID: string): Promise<any[]> {
    const routeList = await routeEntity.getRoutesByAdmin(adminID);
    return routeList;
  }

  static async getRouteDetails(routeId: number): Promise<any> {
    const route = await routeEntity.findRouteById(routeId);
    return route;
  }
}
