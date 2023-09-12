import { DataTypes, IntegerDataType, Model, Optional } from "sequelize";
import dbConn from "../db_connection";
import { Admin } from "./admin.model";

interface RouteAttributes {
  id: number;
  adminID: number;
  routeName: string;
  startingStation: string;
  endingStation: string;
  distance: number;
  farecalc: number;
  estimatedDuration: number;
  stops: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface RouteCreationAttributes extends Optional<RouteAttributes, "id"> {}

interface RouteModel
  extends Model<RouteAttributes, RouteCreationAttributes>,
    RouteAttributes {}

export const Route = dbConn.define<RouteModel>(
  "routes",
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
      allowNull: true,
      references: {
        model: Admin,
        key: "id",
      },
    },
    routeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startingStation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endingStation: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    distance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    farecalc: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    estimatedDuration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stops: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
      defaultValue: [],
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


// dbConn.sync({ alter: true })
//   .then(() => {
//     console.log("Journeys table synchronized");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing journeys table:", error);
//   });
//export default route;
