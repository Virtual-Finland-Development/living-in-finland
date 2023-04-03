export enum AuthProvider {
  TESTBED = 'testbed',
  SINUNA = 'sinuna',
  SUOMIFI = 'suomifi',
}

export type AppContextObj = {
  appName: string;
  redirectUrl: string | URL;
  guid?: string;
  provider?: string;
  meta?: Record<string, string>;
};

export type LoggedInState = {
  idToken: string;
  expiresAt: string;
  profileData: {
    userId: string;
    email: string;
    [key: string]: any;
  };
};

/**
 * NonListedCompany
 */
export type Registrant = {
  givenName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type CompanyDetails = {
  name: string;
  alternativeName: string | null;
  foundingDate: string;
  industrySector: string;
  shareCapital: number;
  capitalCurrency: string;
  settlementDeposit: number;
  depositCurrency: string;
  settlementDate: number;
  countryOfResidence: string;
};

export type CompanyAddress = {
  fullAddress: string;
  thoroughfare: string;
  locatorDesignator: string;
  locatorName: string;
  addressArea: string;
  postCode: string;
  postName: string;
  poBox: string;
  adminUnitLevel1: string;
  adminUnitLevel2: string;
};

export type ShareSeries = {
  shareSeriesClass: 'A' | 'B' | 'C' | 'D' | 'E';
  numberOfShares: number;
  shareValue: number;
  shareValueCurrency: string;
};

export type ManagingDirector = {
  role: 'director' | 'deputy director';
  givenName: string;
  middleNames: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
};

export type BoardMember = {
  role: 'chairperson' | 'member' | 'deputy member';
  givenName: string;
  middleNames: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
};

export type AuditorDetails = {
  companyName: string;
  nationalIdentifier: string;
  givenName: string;
  lastName: string;
};

export interface NonListedCompany {
  registrant: Registrant;
  companyDetails: CompanyDetails;
  companyAddress: CompanyAddress;
  shareSeries: ShareSeries[];
  managingDirectors: ManagingDirector[];
  boardMembers: BoardMember[];
  auditorDetails: AuditorDetails;
}

/**
 * NonListedCompany/BeneficialOwners
 */

export type ShareSeries2 = Omit<
  ShareSeries,
  'shareValue' | 'shareValueCurrency'
> & {
  votesPerShare: number;
};

export type ShareOwrnership = {
  shareSeriesClass: 'A' | 'B' | 'C' | 'D' | 'E';
  quantity: number;
};

export type Shareholder = {
  name: string;
  shareOwnership: ShareOwrnership[];
};

export interface BenecifialOwners {
  shareSeries: ShareSeries2[];
  shareholders: Shareholder[];
}

/**
 * NonListedCompany/SignatoryRights
 */
export interface SignatoryRight {
  role:
    | 'director'
    | 'deputy director'
    | 'chairperson'
    | 'board member'
    | 'deputy board member'
    | 'other';
  personalId: string;
  givenName: string;
  middleNames: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  fullAddress: string;
  thoroughfare: string;
  locatorDesignator: string;
  locatorName: string;
  addressArea: string;
  postCode: string;
  postName: string;
  poBox: string;
  adminUnitLevel1: string;
  adminUnitLevel2: string;
}

export interface SignatoryRights {
  signatoryRights: SignatoryRight[];
}

/**
 * Codesets
 */
export interface Country {
  displayName: string;
  englishName: string;
  id: string;
  nativeName: string;
  threeLetterISORegionName: string;
  twoLetterISORegionName: string;
}

export interface Currency {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  englishName: string;
  twoLetterISOLanguageName: string;
}

export interface Nace {
  codeValue: string;
  dotNotationCodeValue?: string;
  topLevelGroupCode?: string;
  order: number;
  uri: string;
  hierarchyLevel: number;
  prefLabel: {
    en: string;
  };
  broaderCode?: {
    codeValue: string;
    order: number;
    hierarchyLevel: number;
  };
  children?: Nace[];
}

export interface WorkPermit {
  codeValue: string;
  order: number;
  uri: string;
  hierarchyLevel: number;
  prefLabel: {
    en: string;
  };
}

export interface EducationField {
  codeValue: string;
  hierarchyLevel: number;
  order: number;
  prefLabel: { fi: string };
  uri: string;
}
export interface EducationLevel {
  codeValue: string;
  order: number;
  uri: string;
  hierarchyLevel: number;
  prefLabel: {
    en: string;
  };
}

export interface Region {
  statisticsFinlandCode: string;
  code: string;
  label: {
    en: string;
  };
}

export interface Municipality {
  Koodi: string;
  Selitteet: { Kielikoodi: string; Teksti: string }[];
}

export interface Occupation {
  notation: string;
  uri: string;
  prefLabel: {
    en: string;
  };
  narrower?: Occupation[];
}

export interface EscoLanguage {
  id: string;
  name: string;
  twoLetterISOLanguageName: string;
  threeLetterISOLanguageName: string;
  escoUri: string;
}

export interface LanguageSkillLevel {
  codeValue: string;
  prefLabel: {
    en: string;
    fi: string;
  };
  uri: string;
}

/**
 * NSG company BasicInformation
 */
export interface CompanyBasicInformation {
  legalForm: string;
  legalStatus: string;
  name: string;
  registeredAddress: {
    addressArea: string;
    addressId: string;
    adminUnitLevel1: string;
    adminUnitLevel2: string;
    fullAddress: string;
    locatorDesignator: string;
    locatorName: string;
    poBox: string;
    postCode: string;
    postName: string;
    thoroughfare: string;
  };
  registrationDate: string;
}

/**
 * Person/BasicInformation
 */
export interface PersonBasicInformation {
  givenName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  residency: string;
}

/**
 * Person/JobApplicationProfile
 */
/* export interface Occupation {
  escoIdentifier: string;
  escoCode: string;
  workExperience: number;
  employer: string;
} */

export interface Education {
  educationName: string;
  educationLevel: string;
  educationField: string;
  graduationDate: string;
  institutionName: string;
}

export enum SkillLevel {
  'beginner' = 'beginner',
  'intermediate' = 'intermediate',
  'master' = 'master',
}

export interface OtherSkill {
  escoIdentifier: string;
  skillLevel: SkillLevel;
}

export interface LanguageSkill {
  escoIdentifier: string;
  languageCode: string;
  skillLevel: string;
}

export interface Certification {
  certificationName: string;
  escoIdentifier: string;
  institutionName: string;
}

export enum EmploymentType {
  'permanent',
  'temporary',
  'seasonal',
  'summerJob',
}

export enum WorkingTime {
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
}

export interface UserOccupation {
  escoIdentifier: string;
  escoCode: string;
  workExperience: number;
  employer: string;
}
export interface JobApplicantProfile {
  occupations: UserOccupation[];
  educations: Education[];
  languageSkills: LanguageSkill[];
  otherSkills: OtherSkill[];
  certifications: Certification[];
  permits: string[];
  workPreferences: {
    preferredRegion: string[];
    preferredMunicipality: string[];
    typeOfEmployment: EmploymentType;
    workingTime: WorkingTime;
    workingLanguage: string[];
    naceCode: string | null;
  };
}

export interface JmfRecommendation {
  uri: string;
  label: string;
}

export interface JmfRecommendationsRequestPayload {
  text: string;
  maxNumberOfSkills: number;
  maxNumberOfOccupations: number;
  language: string;
}

export interface JmfRecommendationsResponse {
  skills: JmfRecommendation[];
  occupations: JmfRecommendation[];
}
