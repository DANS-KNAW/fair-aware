export interface ILM {
  header: ILMHeader;
  footer: ILMFooter;
  landingPage: ILMLandingpage;
  assessment: unknown;
  about: unknown;
  contact: unknown;
  admin: unknown;
}

interface ILMHeader {
  about: string;
  documentation: string;
  contact: string;
}

interface ILMFooter {
  description: {
    link: string;
    text: string;
  };
  navigation: {
    site: {
      header: string;
      about: string;
      contact: string;
      privacy: string;
    };
    resources: {
      header: string;
      documentation: string;
      glossary: string;
      sourceCode: string;
    };
  };
  copyright: string;
}

interface ILMLandingpage {
  title: string;
  introduction: string; // Look into chopping up the different paragraph's
  form: {
    header: string;
    group: string;
    language: string;
    dot: string;
    button: string;
  };
}
