import { DataTypes, Model, Optional, Op } from "sequelize";
import dbConn from "../db_connection";
import { Admin } from "./admin.model";
import cron from "node-cron"; 

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

// const markSessionsInactive = async () => {
//   const fiveMinutesAgo: any = new Date(new Date() - 2 * 60 * 1000);

//   const sessionsToUpdate = await Session.findAll({
//     where: {
//       isActive: true,
//       createdAt: {
//         [Op.lt]: fiveMinutesAgo,
//       },
//     },
//   });

//   if (sessionsToUpdate.length > 0) {
//     await Session.update(
//       { isActive: false },
//       {
//         where: {
//           id: sessionsToUpdate.map((session) => session.id),
//         },
//       }
//     );
//   }
// };

// Schedule the cron job to run every minute
// cron.schedule("* * * * *", markSessionsInactive);

// dbConn
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Journeys table synchronized");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing journeys table:", error);
//   });
