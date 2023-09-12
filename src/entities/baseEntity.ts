export default class BaseEntity {
  protected modelName: any;
  constructor(modelName: any) {
    this.modelName = modelName;
  }

  async findOneWhere(condition: any): Promise<any | null> {
    const entity = await this.modelName.findOne({ where: condition });
    return entity;
  }

  async findByPk(id: number): Promise<any | null> {
    const entity = await this.modelName.findByPk(id);
    return entity;
  }

  async createEntity(data: any): Promise<any> {
    const newEntity = await this.modelName.create({ ...data });
    return newEntity;
  }

  async findAllWhere(condition: any): Promise<any[]> {
    const entityList = await this.modelName.findAll({ where: condition });
    return entityList;
  }
  async updateEntity(id: number, updates: any): Promise<void> {
    await this.modelName.update(updates, { where: { id } });
  }
  async destroy(dataToDelete:any):Promise<any | null> {
  const entity= await dataToDelete.destroy();
      return entity;
  }

}
