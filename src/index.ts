import Koa from "koa";
import bodyParser from "koa-bodyparser";
import {koaSwagger} from 'koa2-swagger-ui';
import YAML from "yamljs";
import path from "path";
import dbConn from "./database/db_connection";
import adminRoute from "./routes/adminRoute";
import driverRoute from "./routes/driverRoute";
import googleRoute from "./routes/googleModel"
import busRoute from "./routes/busRoute"
import journeyRoute from "./routes/journeyRoute"
import routeRoute from "./routes/routeRoute"
import gogleRoute from './utils/googleDrive'

const app = new Koa();

app.use(bodyParser());

// const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use(koaSwagger({
  routePrefix: '/api-docs',
  swaggerOptions: {
    spec: swaggerDocument,
  },
}));

// app.use(swaggerUi(swaggerDocument, '/api-docs'));

app.use(adminRoute.routes());
app.use(adminRoute.allowedMethods());

app.use(busRoute.routes());
app.use(busRoute.allowedMethods());

app.use(driverRoute.routes());
app.use(driverRoute.allowedMethods());

app.use(journeyRoute.routes());
app.use(journeyRoute.allowedMethods());

app.use(routeRoute.routes());
app.use(routeRoute.allowedMethods());

app.use(googleRoute.routes());
app.use(googleRoute.allowedMethods());

app.use(gogleRoute.routes());
app.use(gogleRoute.allowedMethods());

dbConn
  .authenticate()
  .then(() => {
    
    console.log("Connection successful");
    const port = process.env.PORT || 3005;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Unable to connect:", err);
  });
