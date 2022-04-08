
export interface BaseModel {
  createdId?: number;
  createdDateTime?: Date;
  active: boolean;
  updatedId?: number;
  updatedDateTime?: Date;
  updatedCount: number;
}

export abstract class BaseModelUtil {
  public static serializeBaseModel(model: any): any {
    const obj = Object.assign({}, model);
    obj.createdDateTime = model.createdDateTime ? model.createdDateTime.toISOString() : undefined;
    obj.updatedDateTime = model.updatedDateTime ? model.updatedDateTime.toISOString() : undefined;

    return obj;
  }

  public static deserializeBaseMode(model: any): BaseModel {
    const obj = Object.assign({}, model);
    obj.createdDateTime = new Date(Date.parse(model.createdDateTime));
    obj.updatedDateTime = new Date(Date.parse(model.updatedDateTime));

    return obj;
  }
}
