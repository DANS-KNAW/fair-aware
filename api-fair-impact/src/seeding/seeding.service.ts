import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Language } from '../languages/entities/language.entity';
import { languageSeeds } from './seeds/language.seeds';
import { DigitalObjectType } from '../digital-object-types/entities/digital-object-type.entity';
import {
  DigitalObjectTypeSchema,
  SchemaTypeEnum,
} from '../digital-object-type-schemas/entities/digital-object-type-schema.entity';
import { ContentLanguageModule } from '../content-language-modules/entities/content-language-module.entity';

@Injectable()
export class SeedingService {
  private readonly logger = new Logger(SeedingService.name, {
    timestamp: true,
  });

  constructor(private readonly entityManager: EntityManager) {}

  async seed(): Promise<void> {
    try {
      this.logger.log('Starting seeding');

      this.logger.verbose('Seeding languages');
      await this.entityManager.upsert(Language, languageSeeds, {
        conflictPaths: ['code'],
        skipUpdateIfNoValuesChanged: true,
      });

      this.logger.verbose('Seeding Digital Object Types');
      await this.entityManager.upsert(
        DigitalObjectType,
        { code: 'DATA', label: 'Datasets' },
        {
          conflictPaths: ['code'],
          skipUpdateIfNoValuesChanged: true,
        },
      );

      const digitalObjectTypes =
        await this.entityManager.find(DigitalObjectType);

      const existingSchema = await this.entityManager.findOne(
        DigitalObjectTypeSchema,
        {
          where: {
            digitalObjectType: {
              uuid: digitalObjectTypes[0].uuid,
            },
          },
        },
      );

      if (!existingSchema) {
        await this.entityManager.insert(DigitalObjectTypeSchema, {
          version: '1.0',
          schemaType: SchemaTypeEnum.FAIR,
          schema: {
            dot: 'DATA',
            schema: 'FAIR',
            version: '1.0',
            assessment: [
              {
                criteria: [
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                ],
              },
              {
                criteria: [
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                ],
              },
              {
                criteria: [
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                ],
              },
              {
                criteria: [
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                  {
                    required: true,
                    displayLikelihood: true,
                  },
                ],
              },
            ],
            supportEmail: 'demo@mail.com',
          },
          digitalObjectType: digitalObjectTypes[0],
          active: true,
        });
      }

      const digitalObjectTypeSchemas = await this.entityManager.find(
        DigitalObjectTypeSchema,
      );

      const english = await this.entityManager.findOne(Language, {
        where: {
          code: 'en',
        },
      });

      // Get DOT schema
      const contentLanguageModule = await this.entityManager.findOne(
        ContentLanguageModule,
        {
          where: {
            digitalObjectTypeSchema: {
              uuid: digitalObjectTypeSchemas[0].uuid,
            },
          },
        },
      );

      if (!contentLanguageModule) {
        await this.entityManager.insert(ContentLanguageModule, {
          digitalObjectType: { ...digitalObjectTypes[0] },
          digitalObjectTypeSchema: { ...digitalObjectTypeSchemas[0] },
          language: { ...english },
          // schema: digitalObjectTypeSchemaDATA,
          schema: {
            dot: 'DATA',
            version: '1.0',
            language: null,
            assessment: [
              {
                criteria: [
                  {
                    support: {
                      how: {
                        text: '<p>When you upload your data(set) or metadata to a data repository, the data repository (or other service providers) usually assigns a PID. Repositories ensure that the identifier continues to point to the same data or metadata, according to access terms and conditions you specified.</p> <p>There are many different types of PIDs, each with their own advantages, disadvantages, and disciplines they are typically used in. Generally speaking, the data repository will have thought about these aspects before deciding which PID type to use. In case you have to choose the PID type yourself, you can visit the <a href="http://www.pidforum.org/c/knowledge-hub/11">Knowledge Hub</a> on the PID Forum for guidance. Some disciplines or organisations also provide tools to help you make this choice, see for example this <a href="https://www.pidwijzer.nl/en/pid_results/new">Persistent Identifier Guide</a> for cultural heritage researchers. Once you have chosen a PID type, you can search for data repositories providing that specific PID in registries such as <a href="https://www.re3data.org/search?query=&pidSystems%5B%5D=DOI">Re3data</a> or <a href="https://fairsharing.org/FAIRsharing.hFLKCn">FAIRsharing (see related databases)</a>.</p> <p>Not all data you produce during your research will need a PID. In general, those that underpin published findings or have longer term value are worth assigning a PID. If in doubt about which data should be allocated a PID, speak to your local research data management support team or the data repository.</p>',
                        links: [],
                        title: 'How to do this?',
                      },
                      why: {
                        text: "If your data(set) or metadata does not have a PID, you run the risk of 'link rot' also known as 'link death'. When your data(set) or metadata is moved, updated to a new version, or deleted, older hyperlinks will no longer refer to an active page. Without a PID, others will not be able to find or reuse your data(set) or metadata in the long-term.",
                        links: [],
                        title: 'Why is this important?',
                      },
                      more: {
                        text: '<p>Did you know that a PID can refer to any kind of resource? Besides publications or datasets, a PID can also refer to, for example, a person, a scientific sample, a funding body, a set of geographical coordinates, an unpublished report, or a piece of software. Depending on what you find important to link to, you might want to consider using a PID for one or more of these resource types.</p> <p>Persistent identifiers may point to a data file, a web service response that contains data values, or ideally to an online page that contains metadata for context and the link to access the actual data or details about how to request access. The technical process of translating the identifier to a location is called ‘resolving’ an identifier.</p>',
                        links: [],
                        title: 'Want to know more?',
                      },
                      what: {
                        text: '<p>A <b>persistent identifier</b> is a long-lasting reference to a resource. The <b>data(set)</b> you deposit in a <b>data repository</b> should be assigned a globally unique, persistent and resolvable identifier (PID) so that both humans and machines can find it. Persistent identifiers are maintained and governed so that they remain stable and direct the users to the same relevant object consistently over time. Examples of PIDs include',
                        links: [],
                        title: 'What does this mean?',
                      },
                    },
                    criteria: 'Cn - Identifier Awareness',
                    question:
                      'Are you aware that a data(set) should be assigned a globally unique persistent and resolvable identifier when deposited with a data repository?',
                    principle:
                      'F1. (meta)data are assigned a globally unique and persistent identifier',
                  },
                  {
                    support: {
                      how: {
                        text: '<p>When depositing your data(set), the data repository will show the metadata fields they support. The more fields you fill in, the easier it will be for others to find your data(set). You can use the following list as guidance on which minimum metadata elements to include:</p> <ul> <li>Descriptive information about the data(set) (e.g., creator, title, publisher, creation and publication date, summary and keywords describing the data).</li> <li>The unique, persistent, and resolvable identifier (PID) for the data(set).</li> <li>Data content (e.g., resource type, variable(s) measured or observed, method, data format and size) to accurately reflect the deposited data and increase its reusability.</li> <li>Access rights (e.g., information on how to request access in case the data(set) cannot be shared openly for ethical, legal, or commercial reasons). You should also include information about the rights holder and contact details here (see Q4).</li> <li>Meaningful and explicit links to other research outputs (e.g., prior versions of the data(set), other relevant data(sets), related publications, data source, relevant people (data creators or collectors), relevant organisations (the funder or host institution), ideally with their PIDs) to increase the interoperability and the potential for reuse of your data(set).</li> </ul>',
                        links: [],
                        title: 'How to do this?',
                      },
                      why: {
                        text: '<p>By providing the minimum descriptive information about your data(set), you will be assured that potential users, including those from other research domains, will be able to find and cite your data(set).</p> <p>It is worth spending time on providing a good description of your data(set). By sharing more details, you will make your data not just findable but also easier to understand for others. The more extensive, accurate, and clear the discovery metadata, the easier it is for potential reusers to determine whether or not they want to access your data(set).</p>',
                        links: [],
                        title: 'Why is this important?',
                      },
                      more: {
                        text: '<p>If you are looking for additional resources on descriptive metadata, see common data citation guidelines (e.g., <a href="https://datacite.org/cite-your-data.html" >DataCite</a>, <a href="https://doi.org/10.6084/m9.figshare.8441816.v1" >ESIP</a>, and <a href="https://iassistdata.org/file/community/sigdc/iassist.html" >IASSIST</a>), and metadata recommendations for data discovery, (e.g., <a href="https://dublincore.org" >Dublin Core</a>, <a href="https://eoscpilot.eu/edmi-metadata-guidelines" >EOSC Datasets Minimum Information (EDMI)</a>,  <a href="https://schema.datacite.org/">DataCite Metadata Schema</a>, and <a href="https://www.w3.org/TR/2017/REC-dwbp-20170131/" >W3C Recommendation Data on the Web Best Practices</a>).</p> <p>These are some examples of datasets with good discovery metadata:</p>',
                        links: [],
                        title: 'Want to know more?',
                      },
                      what: {
                        text: '<p><b>Metadata</b> is “data about data”, meaning that this type of data only contains information that describes or characterizes other data. There are different types of metadata that underlie different FAIR aspects. The focus of this question is on making sure your data(set) has a set of minimum descriptive information elements (also known as “discovery metadata”) to adequately communicate the content of your data(set) to others.</p>',
                        links: [],
                        title: 'What does this mean?',
                      },
                    },
                    criteria: 'Cn - Metadata Necessity',
                    question:
                      'Are you aware that when you deposit a data(set) in a data repository, you will need to provide discovery metadata in order to make the data(set) findable, understandable and reusable to others?',
                    principle:
                      'F2. data are described with rich metadata (defined by R1 below)',
                  },
                  {
                    support: {
                      how: {
                        text: '<p>Most digital data repositories will have some kind of protocol for making metadata machine-readable. Two protocols that support FAIR (because they are open, free, and universally implementable) are <a href="http://www.openarchives.org/pmh/" >OAI-PMH</a> and <a href="https://restfulapi.net/" >REST API</i></a>. Therefore, even though it is the responsibility of the data repository to carry out this task, it is your responsibility to select the right data repository to meet this requirement. You can search for such a data repository on a registry such as <a href="https://www.re3data.org/search?query=" >Re3data</a> by filtering on ‘API’.</p>',
                        links: [],
                        title: 'How to do this?',
                      },
                      why: {
                        text: '<p>By ensuring that the metadata describing your data(set) is machine-readable, it will be findable to the systems that collect (also known as <b>harvesting</b>) and aggregate data for search engines or databases (e.g., Google Search, Web of Science, or a university library collection). This improves your chances of having your data(set) cited and reused, because it will reach a larger audience. Without machine-readable metadata, your data(set) will only be found by people searching the data collection of the specific repository you deposited in or those that have a direct link to your data(set).</p>',
                        links: [],
                        title: 'Why is this important?',
                      },
                      more: {
                        text: '<p>Metadata may also be exposed as <b>structured data</b> embedded within a webpage. This makes the metadata more <b>machine-actionable</b>. The <a href="https://www.schema.org" >Schema.org</a> standard is one approach that helps to ensure indexing by web search engines such as Google and Bing. This facilitates the <a href="https://datasetsearch.research.google.com" >Google Dataset Search</a> which you can use to check if data hosted by the repository of your choice is indexed.</p> <p>If you are interested to understand more about how a machine reads a webpage, you can enable the developer view in your web browser (instructions vary between browsers) and take a look at a website. <a href="https://zenodo.org" >Zenodo</a> is an example of a website that uses the Schema.org metadata standard.</p>',
                        links: [],
                        title: 'Want to know more?',
                      },
                      what: {
                        text: '<p>This question refers to the capability to make the metadata accessible online in a standard and machine-readable format. <b>Machine-readability</b> means that the data is presented in a structured <b>format</b> that computers can read and process. Facilitating this process is a responsibility of the data repository you deposit your data(set) in.</p>',
                        links: [],
                        title: 'What does this mean?',
                      },
                    },
                    criteria: 'Cn - Machine Readability',
                    question:
                      'Are you aware that the data repository providing access to your data(set) should make the metadata describing your data(set) available in a format readable by machines as well as humans?',
                    principle: '',
                  },
                ],
                principle: 'Pn - Findable',
              },
              {
                criteria: [
                  {
                    support: {
                      how: {
                        text: '<p>You should determine the access level(s) and licence of your data(set) before depositing in a data repository. If you are not sure about the right access level or the licence for your data(set), check the institutional or funder policies or speak to your local research data management support team. Also be sure to choose a data repository that supports your desired access level and licence. You can search for such a data repository on a registry such as <a href="https://www.re3data.org/search?query=" >Re3data</a>, by filtering on ‘Database access’ and ‘Database license’.</p> <p>If you are depositing data associated with a publication, it is recommended to include a <b>data availability statement</b> in your publication. This statement communicates to readers of your publication where the data(set) is available and how it can be accessed. It also includes a link to the data(set). Most journals, especially those with a data sharing policy, will have templates for data availability statements available.</p>',
                        links: [],
                        title: 'How to do this?',
                      },
                      why: {
                        text: '<p>As explained in Q2, the metadata describing your data(set) should include details about who can access the data(set) as well as any possible related conditions that need to be met in order to gain access. By clearly specifying these details, you will be assured of the most appropriate access level to your data(set). A data(set) can have a public, embargoed, restricted, or closed access level. You can read more about access levels in the ‘What to know more?’ section.</p> <p>In some cases, you may even need to apply a variety of access levels to different parts of the same data(set). It is important to consider these issues early on for all your data(sets), so that the access levels are clearly defined before you upload the data(set) to a data repository. </p> <p>Data should also be accompanied by a clear <b>licence</b> so that other people can legally reuse it. It is recommended to add a licence to all kinds of data(sets) and access levels. Without an explicit licence or a waiver, potential reusers do not have a clear sense of what can be done with your data. It is easiest to use a standard type license for your data(set), since there are many different types that will cover most basic legal situations (e.g., <a href="https://creativecommons.org/licenses" >Creative Commons</a>). It is also possible to create your own bespoke licence, though it is recommended to seek help from a legal expert if you wish to pursue this. Your chosen licence should also be part of your (machine-readable) metadata to effectively inform any human or machine that comes across your data(set) about what they’re allowed to do with it.</p>',
                        links: [],
                        title: 'Why is this important?',
                      },
                      more: {
                        text: '<p>Access levels can be categorised as follows:</p> <ul> <li><u>Public access</u> refers to data which everyone can access without any restrictions.</li> <li><u>Restricted access</u> refers to data that one can access under certain conditions (e.g. because of commercial, sensitive, or other confidentiality reasons or the data is only accessible via a subscription or a fee). Restricted data may be available to a particular group of users or after permission is granted.For restricted data, the metadata should include the conditions of access to the data (e.g., point of contact or instructions to access the data). In case you need to restrict access to your data(set), you should check if your data repository of choice supports access requests.</li> <li><u>Closed access</u> refers to data that is not made publicly available and for which only metadata is publicly available.</li> <li><u>Embargoed access</u> refers to data that will be made publicly accessible – either publicly or restricted –                 at a specific date which should be specified in the metadata. For example, a researcher may release their data after having published their findings from the data.</li> </ul> <p>You can learn more about standard and bespoke licenses in this “<a href="https://www.dcc.ac.uk/guidance/how-guides/license-research-data#top" >How to License Research Data</a>” guide from DCC.</p>',
                        links: [],
                        title: 'Want to know more?',
                      },
                      what: {
                        text: '<p>Ideally, data(sets) should be public domain and openly <b>accessible</b> without restrictions. However, there can be legitimate reasons not to share data (e.g., privacy protection, ethical, legal, or commercial constraints). As such, it is your responsibility to be aware of what can be shared, with whom and when, and to take appropriate steps to ensure that the data is as open as possible and as closed as necessary.</p>',
                        links: [],
                        title: 'What does this mean?',
                      },
                    },
                    criteria: 'Cn - Access Control',
                    question:
                      'Are you aware that access to your data(set) may need to be controlled and that metadata should include licence information under which the data(set) can be reused?',
                    principle: '',
                  },
                  {
                    support: {
                      how: {
                        text: '<p>Whether or not a data repository provides continued access to metadata depends on the data repository preservation practices, which are usually documented in a <b>preservation plan</b> or <b>policy</b>. You should check whether the data repository you deposit your data(set) in has the policy to maintain metadata when data are removed. Make sure to include the persistent identifier in the remaining metadata and a statement on why this data(set) is no longer available.',
                        links: [],
                        title: 'How to do this?',
                      },
                      why: {
                        text: '<p>Even when your data(set) is not accessible, the metadata in itself can be very valuable for future reuse, especially when it is rich enough. Rich metadata means that it is elaborate enough to adequately inform someone with no prior knowledge about your data(set).  Keeping metadata accessible is a way to assure that your work can still be of use for future (replication) studies. If you want others to continue to discover and cite your work, it is essential to make sure the metadata describing your data(set) always remains available. As long as this is the case, links to your data(set) will not become invalid, but will simply point to the metadata only.</p>',
                        links: [],
                        title: 'Why is this important?',
                      },
                      more: {
                        text: '<p>After the <b>data retention period</b> has passed, there are different justifiable reasons to not keep (all) of your data(set) available over time:</p> <p>In case you have used <b>consent forms</b> which specified a certain preservation period after which your data must be destroyed, we recommend:</p> <ul> <li>to update your metadata record after destroying the rest of the data(set)</li> <li>to indicate why the data(set) is no longer available </li> <li>to make sure the metadata is rich enough for others to understand what the data(set) was about</li> </ul> <p>You should discuss with your local research data management support whether it is necessary to incorporatea <b>data destruction statement</b> in your consent form. Try to aim for the longest data retention and sharing period possible for you. If data destruction is unavoidable,make sure you choose a data repository that can adequately handle this.</p> <p>Maintaining (all of) your data(set) may be too costly in the long term. By removing (parts of) your data(set), you can lower these costs and keep your data(set) accessible for longer. Make sure the remaining (meta)data is rich enough for others to understand what the data that is no longer accessible was about.</p> <p>Data retention standards vary greatly in scientific fields. You should follow the data retention guidelines from the field you work in. In some cases, this could mean that you preserve a smaller part of your data(set) or that you preserve it for a shorter period of time. Do make sure that your metadata is rich enough both for humans and machines to understand it.</p>',
                        links: [],
                        title: 'Want to know more?',
                      },
                      what: {
                        text: '<p>Even if a data(set) is no longer available, published references and links should always point to its metadata for transparency and integrity. In other words, this question is about whether the metadata will be preserved even when the data(set) it describes may no longer be available. </p>',
                        links: [],
                        title: 'What does this mean?',
                      },
                    },
                    criteria: 'Cn - Metadata Persistence',
                    question:
                      'Are you aware that metadata should remain available over time, even if the data(set) is no longer accessible?',
                    principle:
                      'A2. metadata are accessible, even when the data are no longer available',
                  },
                ],
                principle: 'Pn - Accessible',
              },
              {
                criteria: [
                  {
                    support: {
                      how: {
                        text: '<p>Controlled vocabularies are often domain-specific. It is recommended to use the vocabulary that is used most often in your field or specific line of research (see Q8). If you are unsure about this, you can contact your research support staff or look up some data(sets) from colleagues in your field.</p> <p>You can find data repositories supporting your preferred controlled vocabulary in registries such as <a href="https://fairsharing.org/standards" >FAIRsharing</a> or <a href="https://www.re3data.org/search?query=" >Re3data</a> by filtering on ‘metadata standards’. Below is a non-exhaustive list of some registries or look-up services for vocabularies. You can use these resources to search for a vocabulary that covers terms relevant for your research.</p>',
                        links: [],
                        title: 'How to do this?',
                      },
                      why: {
                        text: '<p>When using controlled vocabularies, the discovery, linking, understanding, and reuse of research data are improved. Using controlled vocabularies in metadata facilitates enhanced data search because people will not have to guess the exact terms you used to describe your data(set) to find it. It also helps facilitate better interoperability of data from different sources, since it will be clear that data(sets) using the same terms cover the same information.</p> <p>Data repositories should provide support for the use of controlled vocabularies in metadata by offering relevant functionalities. They will often display which controlled vocabularies they support on their website. When controlled vocabularies are included in the metadata, your data repository of choice may be able to publish the metadata in machine-readable format, thus greatly increasing their machine actionability.</p>',
                        links: [],
                        title: 'Why is this important?',
                      },
                      more: {
                        text: '<p>If your field has no common controlled vocabularies (yet), you can search for one you personally find most suitable. It is recommended to do this in collaboration with your research support staff. Before using a controlled vocabulary, you should establish the following:</p> <ul> <li>Whether it is available online and is open to other users</li> <li>Whether it contains the relevant terms for your line of research</li> <li>Whether you know who curates and makes the vocabulary available to other users</li> <li>Whether it is an nationally or internationally recognized vocabulary and if it is used extensively</li> </ul>',
                        links: [],
                        title: 'Want to know more?',
                      },
                      what: {
                        text: '<p>There are many different ways you can describe the same information when filling out the metadata for your deposit. To prevent ambiguity and facilitate better findability, interoperability, and machine-readability, you should use a <b>controlled vocabulary</b> to enter your metadata.</p> <p>Controlled vocabularies are lists of terms that are created for specific uses or contexts. They are a type of <b>semantic artefact</b> and can take the form of, for example, an ontology, thesaurus, or taxonomy. Each type of vocabulary comes with a different degree of sophistication(e.g. in their level of expressiveness, structure, and inferential power).</p>',
                        links: [],
                        title: 'What does this mean?',
                      },
                    },
                    criteria: 'Cn - Vocabulary Control',
                    question:
                      'Are you aware that the metadata describing your data(set) should use controlled vocabularies?',
                    principle:
                      'I2. (meta)data use vocabularies that follow FAIR principles',
                  },
                ],
                principle: 'Pn - Interoperable',
              },
              {
                criteria: [
                  {
                    support: {
                      how: {
                        text: '<p>The provenance information that is necessary for your data(set) depends on the <b>data type</b> (e.g., measurement, observation, derived data, or data product) and research domain of your work. For that reason, it is difficult to capture a set of finite provenance records adequate to all domains. It is recommended to include at a minimum the following provenance properties of data generation or collection should be supplied as part of the metadata (this is not an exhaustive list):</p> <ul> <li>Sources of data generation or collection (e.g., model, instrument, methodology)</li> <li>The date of data creation or collection</li> <li>The contributor(s) involved</li> <li>Data versioning information (indicate relations to other versions and describe changes)</li> </ul>',
                        links: [],
                        title: 'How to do this?',
                      },
                      why: {
                        text: '<p>By providing provenance information about the data(set) (e.g. sources, date, contributor, version), you make it possible for users to determine whether to trust the authenticity of the data(set) and enable its (re)use. It is a transparent way to communicate why, how, when, where, and by whom your data(set) was created. </p>',
                        links: [],
                        title: 'Why is this important?',
                      },
                      more: {
                        text: '<p>There are various ways in which provenance information may be included in a metadata record. Some of the provenance properties (e.g., instrument, contributor) may be best represented using persistent identifiers (such as <a href="https://www.doi.org" >DOI</a> for data, <a href="https://orcid.org" >ORCID</a> for researchers, <a href="https://www.grid.ac"> GRID</a> for organisations). This way, humans and machines can retrieve more information about each of the properties by resolving the PID.</p> <p>Alternatively, the provenance information can be given a linked provenance record expressed explicitly using a controlled vocabulary (e.g., <a href="https://www.w3.org/TR/prov-o">PROV-O</a>, <a href="https://pav-ontology.github.io/pav">PAV</a>, or <a href="https://www.w3.org/TR/void" >Vocabulary of Interlinked Datasets (VoID)</a>). For further information on which provenance data is necessary for the research community of your research domain, contact your research support staff.</p>',
                        links: [],
                        title: 'Want to know more?',
                      },
                      what: {
                        text: '<p>Data <b>provenance</b> (also known as lineage) is a type of metadata that represents the history of your data(set), including information about the people, entities, and processes involved in the data creation. You can also describe and/or link previous versions of your data(set) in the provenance information. Aside from conveying important information about your data(set) to potential reusers, you can also communicate how you wish to be cited. </p>',
                        links: [],
                        title: 'What does this mean?',
                      },
                    },
                    criteria: 'Cn - Provenance Information',
                    question:
                      'Are you aware that provenance information about the collection and/or generation of data should be included in the metadata?',
                    principle:
                      'R1.2. (meta)data are associated with detailed provenance',
                  },
                  {
                    support: {
                      how: {
                        text: '<p>You can use metadata registries such as the <a href="https://rd-alliance.github.io/metadata-directory/standards/" >RDA</a> or <a href="https://www.dcc.ac.uk/guidance/standards/metadata" >DCC</a> to find more information on community-endorsed standards. For example, some well-established metadata standards are:</p> <ul> <li><a href="https://dublincore.org/resources/metadata-basics/" >Dublin Core Metadata Initiative (DCMI)</a>: General purpose standard for which elements and vocabulary to use in metadata.</li> <li><a href="https://ddialliance.org/">DDI</a>: Standard for the social, behavioral, economic and health sciences</li> <li><a href="https://dwc.tdwg.org/">Darwin Core</a>: A body of standards for the life sciences.</li> <li><a href="https://geocase.eu/efg" >ABCDEFG</a>: An extension of the standard for biological sciences to support the geosciences.</li> <li><a href="https://www.nexusformat.org/" >NeXus</a>: A data format standard specifically for x-ray, neutron, and muon science.</li> </ul> <p>A domain- or discipline-specific data repository should be your preferred choice for depositing your data(set). Such a repository will support a metadata standard for your relevant community. You can search for a suitable data repository by using Re3data and browsing on <a href="https://www.re3data.org/browse/by-subject" >domain or subject</a>.</p> <p>In case your domain has limited standards or standards that are still under development, you should follow general purpose standards. In case no dedicated data repositories are available for your domain (yet), we recommend contacting a research data management expert in your area to identify possible solutions.</p>',
                        links: [],
                        title: 'How to do this?',
                      },
                      why: {
                        text: '<p>The main purpose of a community standard is to prevent misunderstandings due to ambiguity by making sure everyone is speaking the same language. By following the specifications of a community-endorsed standard for your metadata, you make sure that others can clearly understand and (re)use your data. It is easier to understand and reuse data that is similar to your own or that of others in the same field. Moreover, using a clearly defined structure and wording in your metadata can facilitate replication studies or meta-analyses.</p>',
                        links: [],
                        title: 'Why is this important?',
                      },
                      more: {
                        text: '<p>If you are interested in learning how metadata elements are converted into machine-readable files, you can take a look at the “<a href="https://nsteffel.github.io/dublin_core_generator" >Dublin Core Generator</a>”. This tool can transform your Dublin Core metadata into a machine-readable format.</p> <p>Many standards undergo continuous evaluation and development. The community-endorsed standards aim to be relevant for the users in the community which is why many of the organisations and initiatives that develop and maintain these standards seek community feedback. If you are interested in the topic of community standards and want to share your experiences or provide input, you can visit the website of any specific standard to get in touch. </p>',
                        links: [],
                        title: 'Want to know more?',
                      },
                      what: {
                        text: '<p>To ensure that your metadata can be broadly shared and understood within your research domain, we recommend using a <b>community-endorsed standard</b>. A standard is any semantic artefact (see Q6), format (see Q3) or other information structure that is widely used in a specific group. If there are any agreements on best practices or standards in your community, you should always give preference to this option.</p> <p>Community standards may be formally recognized or less formal in their occurrence, but they will always be used and endorsed by the majority of the given community. What “community” means in this context can vary. It is highly recommended to follow domain- or discipline-specific standards, but there are also general purpose standards and smaller scale standards for sub-disciplines or organisations.</p>',
                        links: [],
                        title: 'What does this mean?',
                      },
                    },
                    criteria: 'Cn - Metadata Standards',
                    question:
                      'Are you aware that metadata describing your data(set) should follow the specifications of a community-endorsed standard?',
                    principle:
                      'R1.3. (meta)data meet domain-relevant community standards',
                  },
                  {
                    support: {
                      how: {
                        text: '<p>Data should be made available in a recommended file format that is accepted by the research community to enable data sharing, interoperability, and reuse. It is also important that the file format is supported by the data repository to enable long-term preservation. Repositories usually display an overview of their supported or preferred ( and sometimes also non-preferred) file formats on their website, and will generally have a couple of different options per data type (see for example the <a href="https://ukdataservice.ac.uk/learning-hub/research-data-management/format-your-data/recommended-formats" >UK Data Service</a> or <a href="https://dans.knaw.nl/en/file-formats" >DANS</a>). If you deposit your data in such a file format, the repository should have the necessary information, procedures, and expert knowledge to migrate your file(s) to a new one once it becomes outdated.</p> <p>If there is no open file format available for your data type, you may use a proprietary format. Try to find formats that are widely used and well-established, as the chances of those formats becoming obsolete are much smaller.</p>',
                        links: [],
                        title: 'How to do this?',
                      },
                      why: {
                        text: '<p>A proprietary file format is created and owned by a company and often accompanies a specific software. This means that people who don’t have a licence for this software will not be able to open your file(s). Moreover, the developments and updates such a file format may undergo are dependent on the owner of the company, therefore it may be that older versions of the file format will not be supported in the future, or that the file format will cease to exist entirely. This doesn’t facilitate <b>long-term preservation</b>, as people may not be able to open your file(s) in the future.</p> <p>Open file formats are publicly accessible and often undergo less changes over time. They can be opened by anyone without the necessity of a license, which means your data(set) can be used more widely.</p>',
                        links: [],
                        title: 'Why is this important?',
                      },
                      more: {
                        text: '<p>The choice you make for short-term data processing may differ from the choices you make for long-term data preservation. During your research, you may want to adhere to the proprietary file formats that suit your chosen software or measurement instrument. To meet this FAIR requirement, you should convert your file(s) before depositing in a data repository. The software will often have some options built-in for this. During this process, it is important to be mindful of the risk of data loss during conversion. If you are unsure about which file format to convert your data to or how to do it, you should consult your data repository of choice or research support staff. </p>',
                        links: [],
                        title: 'Want to know more?',
                      },
                      what: {
                        text: '<p><b>File formats</b> refer to methods for encoding digital information. You can recognize a file format by the extension (the three or four letters at the end of a filename). A file can either be <b>open</b> or <b>proprietary</b> in its format. It is highly recommended to use an open file format for your data(set), so that others can easily access and reuse it.</p>',
                        links: [],
                        title: 'What does this mean?',
                      },
                    },
                    criteria: 'Cn - File Format',
                    question:
                      'Are you aware that your data(set) should be deposited preferably in a file format that is open and supported by the data repository for long-term preservation?',
                    principle:
                      'R1.3. (meta)data meet domain-relevant community standards',
                  },
                  {
                    support: {
                      how: {
                        text: '<p>To make sure your data(set) is in good hands, we recommend you to deposit it in a <b>trusted digital repository</b> (TDR). TDRs have an explicit mission to provide access to and preserve data. They play a critical role in making data FAIR, providing support, and preserving data over time in a FAIR manner. You can find certified data repositories in registries such as <a href="https://www.re3data.org/search?query=" >Re3data</a>, by filtering on ‘certificates’, or on the website of the certificate organisation.</p> <p>To make sure your data(set) can become as FAIR as possible and receive the best care over time, you should plan sufficient financial and/or human resources in your research project early in advance. This should include the costs of data stewardship throughout the project and the costs of long term preservation of the data to make sure your data is accessible for as long as possible. You can use the <a href="https://zenodo.org/record/6088215#.YlacDbixVz8" >FAIR-Aware Additional guidance to the Science Europe DMP assessment rubric</a> to be more FAIR-explicit in your <b>Data Management Plan</b>.</p>',
                        links: [],
                        title: 'How to do this?',
                      },
                      why: {
                        text: '<p>Data curation and digital preservation requires people, skills, and technology. All the steps you take towards making your data(set) FAIR and of good quality contribute to the data curation process. You should be aware of the role a data repository plays in this process from the start and determine what kind of care and expertise you expect from a data repository to make sure your data(set) is preserved and kept FAIR over time. As other questions in this tool have already emphasized, the choice of data r epository that you make has a great impact on not only the findability, accessibility, interoperability, and reusability, but also the general value and impact of your data(set).</p>',
                        links: [],
                        title: 'Why is this important?',
                      },
                      more: {
                        text: '<p>There are different community-endorsed repository certification standards, such as the <a href="https://www.coretrustseal.org/why-certification/certified-repositories" >CoreTrustSeal</a>, <a href="https://www.beuth.de/de/norm/din-31644/147058907" >DIN31644/NESTOR</a> and <a href="https://public.ccsds.org/Pubs/652x0m1.pdf" >ISO163638</a>. Each of these standards have different requirements that a repository should meet to receive certification. You can find these requirements on their respective websites.</p> <p>More recently, the digital repository community has developed and endorsed a set of guiding principles to demonstrate general digital repository trustworthiness. These principles stand for Transparency, Responsibility, User focus, Sustainability and Technology (<a href="https://doi.org/10.1038/s41597-020-0486-7" >TRUST</a>). Certification requirements are based on these principles, to make sure certification is an indication of trustworthiness.</p> <p>In the absence of formal certification, a data repository can still be FAIR-enabling by facilitating some of the important qualities mentioned in the FAIR and TRUST principles. However, this is more difficult to discover on the outside. Other organisations, including funders or publishers, can also enable or support FAIRness by upholding requirements for data management or FAIR practices (e.g., mandating Data Management Plans), these organisations contribute to a more FAIR scientific landscape.</p>',
                        links: [],
                        title: 'Want to know more?',
                      },
                      what: {
                        text: '<p><b>Data curation</b> is the active and ongoing management of data to ensure that it’s available for discovery and reuse. This process covers the entire lifecycle of the data(set), starting at the selection or creation and continuing on for as long as the data(set) exists. <b>Digital preservation</b> is a part of this data curation process and refers to the series of managed activities necessary to ensure continued access to and reusability of the data(set) for as long as necessary (i.e. keeping the data(set) FAIR over time). These actions are a collaborative effort of the researcher and the data repository. <b>Data stewardship</b> also plays an important role throughout the process by managing and overseeing an organization’s data assets.</p>',
                        links: [],
                        title: 'What does this mean?',
                      },
                    },
                    criteria: 'Cn - Data Curation',
                    question:
                      'Are you aware that keeping your data(set) FAIR over time requires professional data curation and digital preservation?',
                    principle:
                      'How likely are you willing to comply with this practice?',
                  },
                ],
                principle: 'Pn - Reusable',
              },
            ],
            schemaType: 'FAIR',
            languageCode: null,
            supportEmail: 'demo@mail.com',
          },
        });
      }

      this.logger.log('Seeding complete.');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
