export interface SignUp {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface GenLogin {
  email: string;
  choice: string;
}

export interface Login {
  username: string;
  password: string;
  otp: string;
}

export interface GenerateOtp {
  email: string;
}

export interface CheckOtp {
  email: string;
  otp: string;
  newpassword: string;
}
export interface AddBus {
  busName: string;
  capacity: number;
  manufacturer: string;
  model: string;
  year: string;
  registrationNumber: string;
  insuranceExpiryDate: string;
  driverID: number;
  routeID: number;
}

export interface AssignBus {
  driverId: number;
  busId: number;
}

export interface AssignRoute {
  routeId: number;
  busId: number;
}

export interface AddRoute {
  routeName: string;
  startingStation: string;
  endingStation: string;
  distance: number;
  farecalc: number;
  estimatedDuration: number;
  stops: string[];
}

export interface RouteList {
  message: string;
  routeList: any[];
}

export interface RouteDetails {
  message: string;
  route: any;
}
export interface StartJourney {
  busID: number;
  direction: "forward" | "backward";
}

export interface EndJourney {
  journeyID: number;
  direction: "forward" | "backward";
}

export interface MarkStoppage {
  journeyID: number;
  stoppageName: string;
}

export interface GetJourneyDetails{
  journeyId: number;
}

export interface JourneyDetails {
  message: string;
  journey: any;
}

export interface AddDriver {
  adminID: number;
  driverName: string;
  password: string;
  email: string;
  DL: string;
  salary: string;
}

export interface LoginDriver {
  driverName: string;
  password: string;
}

export interface DelDriver {
  driverName: string;
}
