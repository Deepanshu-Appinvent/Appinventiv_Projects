import { Journey } from "../database/models/journeyModel";
import AppError from "../middleware/AppError";
import logger from "../logger/logger";
import BaseEntity from "./baseEntity";

class JourneyEntity extends BaseEntity {
  constructor() {
    super(Journey);
  }

  async createJourney(data: any): Promise<any> {
    return this.createEntity(data);
  }

  async findJourneyById(journeyId: number): Promise<any | null> {
    const journey = await this.findByPk(journeyId);
    if (!journey) {
      logger.error("Journey not found");
      throw new AppError("Journey not found", 404);
    }
    if (journey.endTime) {
      logger.error("Journey has already ended");
      throw new AppError("Journey has already ended", 400);
    }
    return journey;
  }

  async updateJourney(journeyId: number, updates: any): Promise<void> {
    const journey = await this.findByPk(journeyId);
    if (!journey) {
      logger.error("Journey not found");
      throw new AppError("Journey not found", 404);
    }
    await this.updateEntity(journeyId, updates);
  }
}

export const journeyEntity = new JourneyEntity();
export default journeyEntity;
