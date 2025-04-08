export interface IFAIRSchema {
  dot: string;
  version: string;
  supportEmail?: string;

  assessment: IFAIRPrinciple[];

  digitalObjectType: string;
  languageCode: string;
  language: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IFAIRPrinciple {
  criteria: IFAIRCriterium[];
}

export interface IFAIRCriterium {
  required: boolean;
}

export interface IFAIRSchemas {
  dot: string;
  version: string;
  supportEmail?: string;

  assessment: IFAIRPrinciple[];

  digitalObjectType: string;
  languageCode: string;
  language: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IFAIRPrinciples {
  principle: string;
  criterium: IFAIRCriteria[];
}

export interface IFAIRCriteria {
  criteria: string;
  question: string;
  principle: string;
  likelihood: IFAIRLikelihood;
  support: IFAIRSupport;
}

export interface IFAIRCriteriaAnswer extends IFAIRCriteria {
  answer: string | null;
}

export interface IFAIRLikelihood {
  label: string;
}

export interface IFAIRSupport {
  what: IFAIRSupportSection;
  why: IFAIRSupportSection;
  how: IFAIRSupportSection;
  more: IFAIRSupportSection;
}

export interface IFAIRSupportSection {
  title: string;
  text: string;
  links: IFAIRSupportLink[];
}

export interface IFAIRSupportLink {
  link: string;
  label: string;
}
