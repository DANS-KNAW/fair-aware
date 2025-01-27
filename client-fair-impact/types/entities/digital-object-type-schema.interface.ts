import { IFAIRSchema } from "../schemas/fair-schema.interface";
import { IDigitalObjectType } from "./digital-object-type.interface";

export interface IDigitalObjectTypeSchema {
  uuid: string;
  schema: IFAIRSchema;
  version: string;
  active: boolean;

  digitalObjectType: IDigitalObjectType;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
