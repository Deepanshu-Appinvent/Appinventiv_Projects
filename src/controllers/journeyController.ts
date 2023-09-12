import { Context } from "koa";
import { EndJourney, StartJourney, MarkStoppage} from "../utils/interface/Interface";
import {journeyService} from "../services/journeyService";

export class journeyController {
  static async startJourney(ctx: Context): Promise<void> {
    const { busID, direction } = ctx.request.body as StartJourney
    const journey = await journeyService.startJourneyService(busID, direction);
    ctx.status = 201;
    ctx.body = { message: "Journey started successfully", journey };
  }

  static async endJourney(ctx: Context): Promise<void> {
    const { journeyID, direction } = ctx.request.body as EndJourney
    const journey = await journeyService.endJourneyService(journeyID, direction);
    ctx.status = 200;
    ctx.body = { message: "Journey marked as complete", journey };
  }

  static async markStoppage(ctx: Context): Promise<any> {
    const { journeyID, stoppageName } = ctx.request.body as MarkStoppage
    const journey = await journeyService.markStoppageService(journeyID, stoppageName);
    ctx.status = journey.status;
    ctx.body = journey.body;
  }

  static async getJourneyDetails(ctx: Context) {
    const { journeyId } = ctx.request.body as { journeyId: number };
    const journey = await journeyService.getJourneyDetailsById(journeyId);
    ctx.body = { message: "Journey details fetched successfully", journey };
  }

  static async delJourneyController(ctx: Context): Promise<any> {
    const journeyID = ctx.params.journeyID;
    const journey = await journeyService.delJourney(journeyID);
    ctx.status = journey.status;
    ctx.body = journey.body;
  }
}
