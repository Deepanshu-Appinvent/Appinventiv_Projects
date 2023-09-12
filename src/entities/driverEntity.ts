import { Driver } from "../database/models/driver.Model";
import BaseEntity from "./baseEntity";
import logger from "../logger/logger";
import AppError from "../middleware/AppError";

class DriverEntity extends BaseEntity {
  constructor() {
    super(Driver);
  }

  async findDriverByName(driverName: string): Promise<any | null> {
    const driver = await this.findOneWhere({ driverName });
    if (driver) {
      logger.error("Driver Already SignedUp");
      throw new AppError("driverAlreadySignedUp", 400);
    }
    return Driver;
  }

  async findDriverByName2(driverName: string): Promise<any> {
    const driver = await this.findOneWhere({ driverName });
    if (!driver) {
      logger.error("Driver not found");
      throw new AppError("Driver not found", 404);
    }
    return driver;
  }

  async findDriverById(driverId: number): Promise<any | null> {
    const driver = await this.findByPk(driverId);
    if (!driver) {
      logger.error("Driver not found");
      throw new AppError("Driver not found", 404);
    }
    return driver;
  }
  async createNewDriver(driverData: any): Promise<any> {
    const newDriver = await this.createEntity(driverData);
    return newDriver;
  }
  async getDriversByAdmin(adminID: string): Promise<any[]> {
    const driverList = await this.findAllWhere({ adminID });
    return driverList;
  }

  async removeDriver(driverName: string) {
    await this.destroy(driverName);
    return driverName;
  }
}

export const driverEntity = new DriverEntity();
export default DriverEntity;
