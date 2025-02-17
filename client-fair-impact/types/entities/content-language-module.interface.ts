import { IFAIRSchema } from "../schemas/fair-schema.interface";
import { IDigitalObjectType } from "./digital-object-type.interface";

export interface IContentLanguageModule {
  uuid: string;
  schema: IFAIRSchema; // Currently only an single schema is supported but this will change in the future.
  version: string;
  active: boolean;

  digitalObjectType: IDigitalObjectType;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
