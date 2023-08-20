import { Sequelize, DataTypes, QueryTypes } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const db: {
  dbConn?: Sequelize;
  DataTypes?: typeof DataTypes;
  QueryTypes?: typeof QueryTypes;
} = {};

const dbConn = new Sequelize("busManagement", "postgres", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
  },
});

const connectDatabase = async () => {
  try {
    await dbConn.authenticate();
    console.log("Connection successful");
  } catch (err) {
    console.log("Unable to connect:", err);
  }
};

connectDatabase();

db.dbConn = dbConn;
db.DataTypes = DataTypes;
db.QueryTypes = QueryTypes;

export default dbConn;
