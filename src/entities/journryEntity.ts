import { Journey } from "../database/models/journeyModel";
import { Bus } from "../database/models/bus.model";
import { Route } from "../database/models/routeModel";
import AppError from "../middleware/AppError";
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
      throw new AppError("Journey not found", 404);
    }
    return journey;
  }

  async updateJourney(journeyId: number, updates: any): Promise<void> {
    const journey = await this.findByPk(journeyId);
    if (!journey) {
      throw new AppError("Journey not found", 404);
    }
    await this.updateEntity(journeyId, updates);
  }
}

export const journeyEntity = new JourneyEntity();
export default journeyEntity;
