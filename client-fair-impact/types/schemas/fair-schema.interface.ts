export interface IFAIRSchema {
  dot: string;
  version: string;
  supportEmail?: string;

  assessment: IFAIRPrinciple[];

  createdAt: Date;
  modfiedAt?: Date;
}

export interface IFAIRPrinciple {
  criteria: IFAIRCriterium[];
}

export interface IFAIRCriterium {
  required: boolean;
  displayLikelihood: boolean;
}
