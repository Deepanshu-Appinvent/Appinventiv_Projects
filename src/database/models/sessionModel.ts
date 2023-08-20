import { DataTypes, Model, Optional } from "sequelize";
import dbConn from "../db_connection";
import { Admin } from "./admin.model";

interface SessionAttributes {
  id: number;
  adminId: number;
  deviceID: string;
  IP_Address: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SessionCreationAttributes extends Optional<SessionAttributes, "id"> {}

interface SessionModel
  extends Model<SessionAttributes, SessionCreationAttributes>,
    SessionAttributes {}

export const Session = dbConn.define<SessionModel>(
  "sessions", 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: "id",
      },
    },
    deviceID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IP_Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
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


// dbConn.sync({ alter: true })
//   .then(() => {
//     console.log("Journeys table synchronized");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing journeys table:", error);
//   });