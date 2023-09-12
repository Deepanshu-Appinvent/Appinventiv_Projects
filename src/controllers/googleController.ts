import { Context } from "koa";
import { calculateDistance, fetchWeather } from "../services/googleService";

export async function getDistance(ctx: Context) {
  const { city1, city2 } = ctx.request.body as {
    city1: string;
    city2: string;
  };
  const distanceData = await calculateDistance(city1, city2);
  ctx.body = distanceData;
}

export async function getWeather(ctx: Context) {
  const { city } = ctx.request.body as {
    city: string;
  };
    const weatherData = await fetchWeather(city);
    ctx.body = weatherData;
}





























// import { Context } from "koa";
// import axios from "axios";
// import { Route } from "../database/models/routeModel";

// const googleMapsClient = axios.create({
//   baseURL: "https://maps.googleapis.com/maps/api/directions/json",
//   params: {
//     key: process.env.APIKEY,
//   },
// });

// export const createRoute = async (ctx: Context) => {
//   try {
//     const { adminID, routeName, startingStation, endingStation } = ctx.request
//       .body as {
//       adminID: number;
//       routeName: string;
//       startingStation: string;
//       endingStation: string;
//     };

//     const response = await googleMapsClient.get("", {
//       params: {
//         origin: startingStation,
//         destination: endingStation,
//         mode: "driving",
//       },
//     });

//     const { data } = response;
//     const leg = data.routes[0].legs[0];
//     const distance = leg.distance.value; // in meters
//     const estimatedDuration = leg.duration.value; // in seconds
//     const farecalc = calculateFare(distance);

//     const newRoute = await Route.create({
//       adminID: adminID,
//       routeName: routeName,
//       startingStation,
//       endingStation,
//       distance,
//       estimatedDuration,
//       farecalc,
//     });

//     ctx.body = { message: "Route created successfully!", route: newRoute };
//   } catch (error) {
//     console.error("Error:", error);
//     ctx.status = 500;
//     ctx.body = { error: "An error occurred" };
//   }
// };

// function calculateFare(distanceInMeters: number): number {
//   const distanceInKm = distanceInMeters / 1000;

//   const basePrice = 100;
//   const ratePerKm = 10;

//   const fare = basePrice + distanceInKm * ratePerKm;
//   return fare;
// }
