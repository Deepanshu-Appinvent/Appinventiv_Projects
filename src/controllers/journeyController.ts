import { Context } from "koa";
import {
  startJourneyService,
  endJourneyService,
  markStoppageService,
  getJourneyDetailsById,
} from "../services/journeyService";
export async function startJourney(ctx: Context): Promise<void> {
  const { busID, direction } = ctx.request.body as {
    busID: number;
    direction: "forward" | "backward";
  };
  try {
    const journey = await startJourneyService(busID, direction);
    ctx.status = 201;
    ctx.body = { message: "Journey started successfully", journey };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while starting the journey" };
  }
}

export async function endJourney(ctx: Context): Promise<void> {
  const { journeyID, direction } = ctx.request.body as {
    journeyID: number;
    direction: "forward" | "backward";
  };

  try {
    const journey = await endJourneyService(journeyID, direction);
    ctx.status = 200;
    ctx.body = { message: "Journey marked as complete", journey };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error: "An error occurred while marking the journey as complete",
    };
  }
}

export async function markStoppage(ctx: Context): Promise<any> {
  const { journeyID, stoppageName } = ctx.request.body as {
    journeyID: number;
    stoppageName: string;
  };

  try {
    const journey = await markStoppageService(journeyID, stoppageName);
    ctx.status = journey.status;
    ctx.body = journey.body;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while marking the stoppage" };
  }
}

export async function getJourneyDetails(ctx: Context) {
  try {
    const { journeyId } = ctx.request.body as { journeyId: number };
    const journey = await getJourneyDetailsById(journeyId);
    if (!journey) {
      ctx.status = 404;
      ctx.body = { message: "Journey not found" };
      return;
    }
    ctx.body = { message: "Journey details fetched successfully", journey };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while fetching journey details" };
  }
}
