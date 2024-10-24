import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const currentTime = new Date().toISOString();

  const defaultLanguage = await prisma.language.upsert({
    where: { code: "en" },
    update: {},
    create: {
      code: "en",
      name: "English",
    },
  });
  const defaultDot = await prisma.dOT.upsert({
    where: { dot: "DATA" },
    update: {},
    create: {
      dot: "DATA",
      name: "Research Dataset",
    },
  });
  const defaultDOTCLM = await prisma.dOTCLM.upsert({
    where: {
      dotCode_languageCode: {
        dotCode: defaultDot.dot,
        languageCode: defaultLanguage.code,
      },
    },
    update: {},
    create: {
      dotId: defaultDot.id,
      dotCode: defaultDot.dot,
      languageCode: defaultLanguage.code,
      content: {}, // @TODO combine desired schemas.
      learners: 0,
      learnersCompleted: 0,
      version: 1,
      versionDate: currentTime,
    },
  });
  const defaultIlm = await prisma.iLM.upsert({
    where: { languageCode: "en" },
    update: {},
    create: {
      version: 1,
      versionDate: currentTime,
      content: {
        header: {
          about: "About",
          documentation: "Documentation",
          contact: "Contact",
        },
        footer: {
          description: {
            link: "“Fostering FAIR Data Practices In Europe”",
            text: "has received funding from the European Union’s Horizon 2020 project call H2020-INFRAEOSC-2018-2020 Grant agreement 831558. The content of this document does not represent the opinion of the European Union, and the European Union is not responsible for any use that might be made of such content.",
          },
          navigation: {
            site: {
              header: "Sites",
              about: "About",
              contact: "Contact",
              privacy: "Privacy",
            },
            resources: {
              header: "Resources",
              documentation: "Documentation",
              glossary: "Glossary",
              sourceCode: "Source Code",
            },
          },
          copyright: "Copyright",
        },
        landingPage: {
          title: "Assess Your Knowledge of FAIR",
          introduction: `FAIR-Aware is an online tool which helps researchers assess how much they know about the requirements for making different types of digital research outputs (like datasets, software, semantic artifacts, or data management plans) findable, accessible, interoperable, and reusable (FAIR).

The tool comprises carefully designed questions for each type of digital object, with each question generously supplied with additional information and practical tips. These extend users' understanding of the FAIR principles as they work through the questionnaire with their specific digital object in mind.

Presented in a clear and informative way and suitable for different research domains, FAIR-Aware provides guidance for each question, making it easier for users to understand difficult topics and helping them learn how to make their digital objects more FAIR. Part of this guidance also supports researchers in choosing appropriate repositories or platforms for their digital objects, and how to collaborate with these services to create FAIR outputs.`,
          form: {
            header: "FAIR-Aware module and language",
            group: "Group Identification",
            language: "Language",
            dot: "Digital Object Type",
            button: "Start Assessment",
          },
        },
        assessment: {},
        about: {},
        contact: {},
        admin: {},
      },
      languageCode: defaultLanguage.code,
    },
  });
  console.log({ defaultLanguage, defaultDot, defaultDOTCLM, defaultIlm });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: Error) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
