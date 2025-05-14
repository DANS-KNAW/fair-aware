import { ISetting } from "../entities/setting.interface";

export interface IFormCreateSettings {
  contactEmail: ISetting;
  privacyPolicyLink: ISetting;
  introductionText: ISetting;
}