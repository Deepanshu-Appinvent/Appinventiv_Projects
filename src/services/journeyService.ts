import { Journey } from "../database/models/journeyModel";
import { Bus } from "../database/models/bus.model";
import { Route } from "../database/models/routeModel";
import { journeyEntity } from "../entities/journryEntity";

import AppError from "../middleware/AppError";

export class journeyService {
  static async startJourneyService(
    busID: number,
    direction: "forward" | "backward"
  ): Promise<any> {
    const journey = await journeyEntity.createJourney({
      busID,
      direction,
      startTime: new Date(),
      stoppages: [],
    });
    return journey;
  }

  static async endJourneyService(
    journeyID: number,
    direction: "forward" | "backward"
  ): Promise<any> {
    const journey = await journeyEntity.findJourneyById(journeyID);
    journey.endTime = new Date();
    journey.direction = direction;

    await journey.save();
    return journey;
  }

  static async markStoppageService(
    journeyID: number,
    stoppageName: string
  ): Promise<any> {
    const journey = await journeyEntity.findJourneyById(journeyID);
    const stoppagesArray = Array.isArray(journey.stoppages)
      ? journey.stoppages
      : [];
    if (stoppagesArray.includes(stoppageName)) {
      throw new AppError(
        `Stoppage '${stoppageName}' already exists in this journey's stoppages`,
        401
      );
    }
    const bus = await Bus.findByPk(journey.busID as number);
    if (!bus) {
      throw new AppError("Bus not found", 404);
    }
    const route = await Route.findByPk(bus.routeID as number);
    if (!route) {
      throw new AppError("Route not found", 404);
    }
    if (!route.stops.includes(stoppageName)) {
      throw new AppError(
        `Stoppage '${stoppageName}' is not part of this journey stops`,
        401
      );
    }

    const updatedStoppages = [...stoppagesArray, stoppageName];
    await journey.update({
      stoppages: updatedStoppages,
    });
    return { status: 200, body: { message: "Stoppage marked successfully" } };
  }

  static async getJourneyDetailsById(journeyId: number) {
    const journey = await Journey.findByPk(journeyId, {
      include: [
        {
          model: Bus,
          as: "bus",
          attributes: ["busName"],
          include: [
            {
              model: Route,
              as: "route",
              attributes: ["routeName", "distance"],
            },
          ],
        },
      ],
      attributes: {
        exclude: ["busID"],
      },
    });
    if (!journey) {
      throw new AppError("Journey not found", 404);
    }
    return journey;
  }
}
