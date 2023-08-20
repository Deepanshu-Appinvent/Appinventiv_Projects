import { DataTypes,  Model, Optional } from "sequelize";
import dbConn from "../db_connection";
import { Driver } from "./driver.Model";
import { Route } from "./routeModel";
import { Admin } from "./admin.model";

interface BusAttributes {
  id: number;
  busName: string;
  capacity: number;
  manufacturer: string;
  model: string;
  year: string;
  registrationNumber: string;
  insuranceExpiryDate: string;
  driverID: number | null;
  adminID: number | null;
  routeID: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BusCreationAttributes extends Optional<BusAttributes, "id"> {}

interface BusModel
  extends Model<BusAttributes, BusCreationAttributes>,
    BusAttributes {}

export const Bus = dbConn.define<BusModel>(
  "buses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    busName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    insuranceExpiryDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driverID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Driver,
        key: "id",
      },
    },
    routeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Route,
        key: "id",
      },
    },
    adminID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Admin,
        key: "id",
      },
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

Bus.belongsTo(Route, { foreignKey: "routeID", as: "route" });
Bus.belongsTo(Driver, { foreignKey: "driverID", as: "driver" });