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
  alternativeName: string;
  foundingDate: string;
  industrySector: string;
  shareCapital: number;
  settlementDeposit: number;
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
};

export type ManagingDirectors = {
  role: 'director' | 'deputy director';
  givenName: string;
  middleNames: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
};

export type BoardMembers = {
  role: 'chairperson' | 'member' | 'deputy member';
  givenName: string;
  middleNames: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
};

export type Auditor = {
  companyName: string;
  nationalIdentifier: string;
};

export interface NonListedCompany {
  registrant: Registrant;
  companyDetails: CompanyDetails;
  companyAddress: CompanyAddress;
  shareSeries: ShareSeries[];
  managingDirectors: ManagingDirectors[];
  boardMembers: BoardMembers[];
  auditor: Auditor;
}

/**
 * NonListedCompany/BeneficialOwners
 */

export type ShareSeries2 = ShareSeries & { votesPerShare: number };

export type Owrnership = {
  shareSeriesClass: 'A' | 'B' | 'C' | 'D' | 'E';
  quantity: number;
};

export type Shareholder = {
  name: string;
  ownership: Owrnership;
};

export interface BenecifialOwners {
  shareSeries: ShareSeries2[];
  shareholders: Shareholder[];
  ownerships: Owrnership[];
}

/**
 * NonListedCompany/SignatoryRights
 */
export interface SigningRight {
  personalID: string;
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
  signinRights: SigningRight[];
}
