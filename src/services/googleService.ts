import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export async function calculateDistance(
  city1: string,
  city2: string
): Promise<any> {
  const options = {
    method: "POST",
    url: process.env.DISTANCE_URL,
    params: { car: "true" },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "distanceto.p.rapidapi.com",
    },
    data: {
      route: [
        {
          country: "IN",
          name: city1,
        },
        {
          country: "IN",
          name: city2,
        },
      ],
    },
  };
  try {
    const response = await axios.request(options);
    const data_res = response.data.route.car;
    const distance = parseFloat(data_res.distance).toFixed(1);
    const durationInSeconds = parseFloat(data_res.duration);
    const duration = (durationInSeconds / 3600).toFixed(1);
    const fare = await calculateFare(distance, duration);
    console.log(`the distance between ${city1} and ${city2} is ${distance} km, duration is ${duration} hours and cost/fare by bus is ${fare}`);
    return { distance, duration, fare };
  } catch (error) {
    console.error(error);
  }
}

export function calculateFare(distance: any, duration: any): number {
  const BASE_FARE = parseInt(process.env.BASE_FARE || '0', 10);
  const FARE_PER_KM = parseInt(process.env.FARE_PER_KM || '0', 10);
  const FARE_PER_HOUR = parseInt(process.env.FARE_PER_HOUR || '0', 10);

  const distanceFare = distance * FARE_PER_KM;
  const durationFare = duration * FARE_PER_HOUR;

  const totalFare = BASE_FARE + distanceFare + durationFare;

  return totalFare;
}

export async function fetchWeather(city: string): Promise<any> {
  const options = {
    method: "GET",
    url: `https://open-weather13.p.rapidapi.com/city/${city}`,
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const weather = response.data.weather[0].description;

    return { weather };
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
}
