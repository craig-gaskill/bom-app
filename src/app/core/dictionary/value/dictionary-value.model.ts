
export interface DictionaryValue {
  dictionaryValueId?: number,
  display: string;
  meaning: string;
  viewable: boolean;
  editable: boolean;
  deletable: boolean;
  active: boolean;
  updateCount: number;
}

export abstract class DictionaryValueUtil {
  public static deserializeDictionaryValues(values: any): DictionaryValue[] {
    return values;
  }

  public static deserializeDictionaryValue(value: any): DictionaryValue {
    return value;
  }

  public static serializeDictionaryValues(values: DictionaryValue[]): any {
    return values;
  }

  public static serializeDictionaryValue(value: DictionaryValue): any {
    return value;
  }
}
