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

export type Auditor = {
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
  auditor: Auditor;
}

/**
 * NonListedCompany/BeneficialOwners
 */

export type ShareSeries2 = Omit<ShareSeries, 'shareValue'> & {
  votesPerShare: number;
};

export type Owrnership = {
  shareSeriesClass: 'A' | 'B' | 'C' | 'D' | 'E';
  quantity: number;
};

export type Shareholder = {
  name: string;
  ownerships: Owrnership[];
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
