import { Admin } from "../database/models/admin.model";
import BaseEntity from "./baseEntity";
import AppError from "../middleware/AppError";

class AdminEntity extends BaseEntity {
  constructor() {
    super(Admin);
  }

  async findAdminByEmail(email: string): Promise<any | null> {
    const admin = await this.findOneWhere({ email });
    if (admin) {
      throw new AppError("Admin Already SignedUp", 400);
    }
    return admin;
  }

  async findAdminByName(username: string): Promise<any | null> {
    const admin = await this.findOneWhere({ username });
    if (admin) {
      throw new AppError("Admin Already SignedUp", 400);
    }
    return admin;
  }

  async findAdminByEmail2(email: string): Promise<any> {
    const admin = await this.findOneWhere({ email });
    if (!admin) {
      throw new AppError("Admin not found", 404);
    }
    return admin;
  }

  async AdminLogin(username: string): Promise<any> {
    const admin = await this.findOneWhere({ username });
    if (!admin) {
      throw new AppError("Admin not found", 404);
    }
    return admin;
  }

  async findAdminById(adminId: number): Promise<any | null> {
    const admin = await this.findByPk(adminId);
    if (!admin) {
      throw new AppError("Admin not found", 404);
    }
    return admin;
  }
  async createNewAdmin(adminData: any): Promise<any> {
    const newAdmin = await this.createEntity(adminData);
    return newAdmin;
  }
  async getAdminsByAdmin(adminID: string): Promise<any[]> {
    const adminList = await this.findAllWhere({ adminID });
    return adminList;
  }
}

export const adminEntity = new AdminEntity();
export default AdminEntity;
