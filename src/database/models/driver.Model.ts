import { DataTypes, IntegerDataType, Model, Optional } from "sequelize";
import dbConn from "../db_connection";
import { Admin } from "./admin.model";
import { Route } from "./routeModel";

interface DriverAttributes {
  id: number;
  adminID: number | null;
  driverName: string;
  password: string;
  email:string;
  DL: string;
  salary: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DriverCreationAttributes extends Optional<DriverAttributes, "id"> {}

interface DriverModel
  extends Model<DriverAttributes, DriverCreationAttributes>,
    DriverAttributes {}

export const Driver = dbConn.define<DriverModel>(
  "drivers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    adminID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Admin,
        key: "id",
      },
    },
    driverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,

    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

//Driver.belongsTo(Route, { foreignKey: "routeID", as: "route" });

//export default Driver;
// dbConn.sync({ alter: true })
//   .then(() => {
//     console.log("Journeys table synchronized");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing journeys table:", error);
//   });
//export default route;
