import { format } from 'date-fns';
import { isPast, parseISO } from 'date-fns';
import jwt_decode from 'jwt-decode';
import { AppContextObj } from '@/types';
import type { LoggedInState } from '@/types';
import { baseAppContextObj } from '../constants';
import { LOCAL_STORAGE_AUTH_KEY } from '../constants';
import firstNames from '../fake-data/first-names.json';
import lastNames from '../fake-data/last-names.json';
import { JSONLocalStorage } from './JSONStorage';

export function generateAppContextHash(
  applicationContextObj?: Partial<AppContextObj>
) {
  const appContext: AppContextObj = {
    ...baseAppContextObj,
    ...(applicationContextObj || {}),
    redirectUrl: `${window.location.origin}/auth`,
  };
  const appContextBase64 = Buffer.from(JSON.stringify(appContext)).toString(
    'base64'
  );
  return encodeURIComponent(appContextBase64);
}

export function nullifyUndefinedValues<T extends object>(obj: T) {
  for (const [key, value] of Object.entries(obj)) {
    if (!!value && typeof value === 'object') {
      nullifyUndefinedValues(value);
    } else if (value === undefined) {
      obj[key as keyof T] = null as any;
    }
  }
  return obj;
}

export function pickRandomName(type: 'firstName' | 'lastName') {
  const list: string[] = type === 'firstName' ? firstNames : lastNames;
  return list[Math.floor(Math.random() * list.length)] || type;
}

export function generateRandomEmail() {
  const firstName = pickRandomName('firstName');
  const lastName = pickRandomName('lastName');
  return `${firstName}.${lastName}@email.com`;
}

export function pickRandomDateString() {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  return format(new Date(timestamp), 'yyyy-MM-dd');
}

export function removeTrailingSlash(str: string) {
  return str.endsWith('/') ? str.slice(0, -1) : str;
}

export function getValidAuthState() {
  const storedAuthState: LoggedInState | undefined = JSONLocalStorage.get(
    LOCAL_STORAGE_AUTH_KEY
  );
  const tokenNotExpired = storedAuthState?.expiresAt
    ? !isPast(parseISO(storedAuthState.expiresAt))
    : false;
  return {
    isValid: storedAuthState !== undefined && tokenNotExpired,
    storedAuthState: storedAuthState as LoggedInState,
  };
}

export function getUserIdentifier() {
  const token = JSONLocalStorage.get(LOCAL_STORAGE_AUTH_KEY).idToken;

  if (!token) {
    throw new Error('No token.');
  }

  const { sub }: { sub: string | undefined } = jwt_decode(token);
  return sub;
}
