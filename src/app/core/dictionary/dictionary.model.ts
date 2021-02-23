import {BaseModel} from '../base.model';

export interface Dictionary extends BaseModel {
  dictionaryId: number;
  display: string;
  meaning: string;
  description?: string;
  viewable: boolean;
  editable: boolean;
  deletable: boolean;
}

export abstract class DictionaryUtil {
  public static deserializeDictionaries(dictionaries: any): Dictionary[] {
    return dictionaries;
  }

  public static deserializeDictionary(dictionary: any): Dictionary {
    return dictionary;
  }
}
