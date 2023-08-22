import Router from "koa-router";
import Joi from "joi";

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const generateOtpSchema = Joi.object({
  email: Joi.string().email().required(),
});

const checkOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
  newpassword: Joi.string().required(),
});

const addBusSchema = Joi.object({
  busName: Joi.string().required(),
  capacity: Joi.number().integer().required(),
  manufacturer: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.string().required(),
  registrationNumber: Joi.string().required(),
  insuranceExpiryDate: Joi.string().required(),
});

const addRouteSchema = Joi.object({
  routeName: Joi.string().required(),
  startingStation: Joi.string().required(),
  endingStation: Joi.string().required(),
  distance: Joi.number().required(),
  farecalc: Joi.number().required(),
  estimatedDuration: Joi.number().required(),
  stops: Joi.array().items(Joi.string()).required(),
});

const signUpDriver = Joi.object({
  adminID: Joi.number().integer().required(),
  driverName: Joi.string().required(),
  password: Joi.string().required(),
  DL: Joi.string().required(),
  salary: Joi.string().required(),
});

const loginDriver = Joi.object({
  driverName: Joi.string().required(),
  password: Joi.string().required(),
});

function validate(schema: Joi.Schema) {
  return async (ctx: Router.RouterContext, next: () => Promise<any>) => {
    const { error } = schema.validate(ctx.request.body);
    if (error) {
      ctx.status = 400;
      ctx.body = { error: error.details[0].message };
      return;
    }
    await next();
  };
}

export const validateSignUp = validate(signUpSchema);
export const validateLogin = validate(loginSchema);
export const validateGenerateOtp = validate(generateOtpSchema);
export const validateCheckOtp = validate(checkOtpSchema);
export const validateAddBus = validate(addBusSchema);
export const validateAddRoute = validate(addRouteSchema);
export const validateSignUpDriver = validate(signUpDriver);
export const validateLoginDriver = validate(loginDriver);
