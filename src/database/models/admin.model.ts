import { DataTypes, Model, Optional } from "sequelize";
import dbConn from "../db_connection";

interface AdminAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  secret:string
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, "id"> {}

interface AdminModel
  extends Model<AdminAttributes, AdminCreationAttributes>,
    AdminAttributes {}

export const Admin = dbConn.define<AdminModel>(
  "admins",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
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

// dbConn
// .sync({ alter: true })
// .then(() => {
//   console.log("Journeys table synchronized");
// })
// .catch((error) => {
//   console.error("Error synchronizing journeys table:", error);
// });
//export default Admin;
