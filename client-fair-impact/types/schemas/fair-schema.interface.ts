export interface IFAIRSchema {
  dot: string;
  version: string;
  supportEmail?: string;

  assessment: IFAIRPrinciple[];

  createdAt: Date;
  modfiedAt?: Date;
}

interface IFAIRPrinciple {
  criteria: IFAIRCriterium[];
}

interface IFAIRCriterium {
  required: boolean;
  displayLikelihood: boolean;
}
