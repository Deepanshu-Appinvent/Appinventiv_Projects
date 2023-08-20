import { DataTypes, Model, Optional } from "sequelize";
import dbConn from "../db_connection";
import { Route } from "./routeModel";
import { Driver } from "./driver.Model";
import { Bus } from "./bus.model";

interface JourneyAttributes {
  id: number;
  busID: number;
  startTime: Date;
  endTime?: Date;
  direction: "forward" | "backward";
  stoppages: string[]
  createdAt?: Date;
  updatedAt?: Date;
}

interface JourneyCreationAttributes extends Optional<JourneyAttributes, "id"> {}

interface JourneyModel
  extends Model<JourneyAttributes, JourneyCreationAttributes>,
    JourneyAttributes {}

export const Journey = dbConn.define<JourneyModel>(
  "journeys",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    busID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Bus,
        key: "id",
      },
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    direction: {
      type: DataTypes.ENUM("forward", "backward"),
      allowNull: false,
    },
    stoppages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
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

Journey.belongsTo(Bus, { foreignKey: "busID", as: "bus" });
// Journey.belongsTo(Driver, { foreignKey: "driverId", as: "driver" });

// dbConn.sync({ alter: true })
//   .then(() => {
//     console.log("Journeys table synchronized");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing journeys table:", error);
//   });

// export default Journey;
