export interface DigitalObjectType {
  uuid: string;
  label: string;
  code: string;

  digitalObjectTypeSchemas: {
    version: string;
    active: boolean;
  }[];

  updatedAt: string;
  createdAt: string;
  deletedAt: string;
}
