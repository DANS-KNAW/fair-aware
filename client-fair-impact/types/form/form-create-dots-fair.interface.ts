import { IFAIRPrinciple } from "../schemas/fair-schema.interface";

export interface IFormCreateDOTSFAIR {
  supportEmail: string;
  assessment: IFAIRPrinciple[];
}
