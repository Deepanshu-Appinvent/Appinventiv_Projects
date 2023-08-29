import { Bus } from "../database/models/bus.model";
import { Driver } from "../database/models/driver.Model";
import { Route } from "../database/models/routeModel";
import AppError from "../middleware/AppError";
import BaseEntity from "./baseEntity";

class BusEntity extends BaseEntity {
  constructor() {
    super(Bus);
  }

  async addBusService(busData: any): Promise<any> {
    const newBus = await this.createEntity(busData);
    return newBus;
  }

async findBusById(busId:number): Promise<any | null> {
  const bus = await this.findOneWhere({ busId });
  if (!bus) {
    throw new AppError("Bus not found", 404);
  }
  return bus;
}

  async assignBusToDriver(driverId: number, busId: number): Promise<any> {
    const driver = await Driver.findByPk(driverId);
    const bus = await Bus.findByPk(busId);
    if (!driver || !bus) {
      throw new AppError("Driver or bus not found", 404);
    }
    await this.updateEntity(busId, { driverID: driverId });
    return {
      success: true,
      message: "Bus assigned to driver successfully",
      driverName: driver.driverName,
      busName: bus.busName,
    };
  }

  async getBusList(adminID: string): Promise<any[]> {
    const busList = await this.findAllWhere({ adminID });
    return busList;
  }

  async getAssignedBusDetails(driverId: number): Promise<any> {
    const driver = await Driver.findByPk(driverId);
    if (!driver) {
      throw new AppError("Driver not found", 404);
    }
    const bus = await this.findOneWhere({ driverID: driver.id });
    return bus;
  }
}
export const busEntity = new BusEntity();
export default busEntity;
