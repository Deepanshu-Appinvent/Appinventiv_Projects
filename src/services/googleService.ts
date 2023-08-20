// // services/routeService.ts
// import axios from 'axios';
// import { Route } from '../database/models/routeModel'; // Import your Route model

// const googleMapsClient = axios.create({
//   baseURL: 'https://maps.googleapis.com/maps/api/directions/json',
//   params: {
//     key: 'process.env.APIKEY',
//   },
// });

// export const calculateAndStoreRoute = async (
//   startingStation: string,
//   endingStation: string
// ) => {
//   const response = await googleMapsClient.get('', {
//     params: {
//       origin: startingStation,
//       destination: endingStation,
//       mode: 'driving',
//     },
//   });

//   const { data } = response;
//   const leg = data.routes[0].legs[0];
//   const distance = leg.distance.value;
//   const estimatedDuration = leg.duration.value;

//   const newRoute = await Route.create({
//     routeName: `${startingStation} to ${endingStation}`,
//     startingStation,
//     endingStation,
//     distance,
//     estimatedDuration,
//   });

//   return newRoute;
// };
