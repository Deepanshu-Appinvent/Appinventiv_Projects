import { Journey } from "../database/models/journeyModel";
import { Bus } from "../database/models/bus.model";
import { Route } from "../database/models/routeModel";

export async function startJourneyService(
  busID: number,
  direction: "forward" | "backward"
): Promise<any> {
  try {
    const journey = await Journey.create({
      busID,
      direction,
      startTime: new Date(),
      stoppages: [],
    });
    return journey;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while starting the journey");
  }
}

export async function endJourneyService(
  journeyID: number,
  direction: "forward" | "backward"
): Promise<any> {
  try {
    const journey = await Journey.findByPk(journeyID);

    if (!journey) {
      throw new Error("Journey not found");
    }

    journey.endTime = new Date();
    journey.direction = direction;

    await journey.save();
    return journey;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while marking the journey as complete");
  }
}

export async function markStoppageService(
  journeyID: number,
  stoppageName: string
): Promise<any> {
  try {
    const journey: any = await Journey.findByPk(journeyID);

    if (!journey) {
      return { status: 404, body: { message: "Journey not found" } };
    }
    const stoppagesArray = Array.isArray(journey.stoppages)
      ? journey.stoppages
      : [];
    if (stoppagesArray.includes(stoppageName)) {
      return {
        status: 401,
        body: {
          message: `Stoppage '${stoppageName}' already exists in this journey's stoppages`,
        },
      };
    }

    const bus = await Bus.findByPk(journey.busID as number);
    if (!bus) {
      return { status: 404, body: { message: "Bus not found" } };
    }
    const route = await Route.findByPk(bus.routeID as number);
    if (!route) {
      return { status: 404, body: { message: "Route not found" } };
    }
    if (!route.stops.includes(stoppageName)) {
      return {
        status: 401,
        body: {
          message: `Stoppage '${stoppageName}' is not part of this journey stops`,
        },
      };
    }

    const updatedStoppages = [...stoppagesArray, stoppageName];
    await journey.update({
      stoppages: updatedStoppages,
    });
    return { status: 200, body: { message: "Stoppage marked successfully" } };
  } catch (error) {
    throw new Error("An error occurred while marking the stoppage");
  }
}

export async function getJourneyDetailsById(journeyId: number) {
  try {
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
    return journey;
  } catch (error) {
    throw new Error("An error occurred while fetching journey details");
  }
}
