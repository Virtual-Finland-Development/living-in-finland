import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ATOF_BASE_URL,
  EXT_REGISTRATION_SERVICE_URL,
} from '@/lib/api/endpoints';
import { parseReferrer } from '@/lib/utils';
import { JSONSessionStorage } from '@/lib/utils/JSONStorage';

interface ReferrerSettings {
  text: string;
  redirectText: string;
  redirectUrl: string;
}

const REFERRER_SETTINGS = {
  atof: {
    text: 'You arrived from Access to Finland app!',
    redirectText: 'Go back to Access to Finland',
    redirectUrl: ATOF_BASE_URL,
  },
  ext_service: {
    text: 'You arrived from External Service demo app!',
    redirectText: 'Go back to External Service demo app',
    redirectUrl: `${EXT_REGISTRATION_SERVICE_URL}/auth?provider=testbed`,
  },
};

interface ReferrerContextProps {
  referrer: string;
  referrerSettings: ReferrerSettings | undefined;
}

interface ReferrerProviderProps {
  children: ReactNode;
}

const ReferrerContext = createContext<ReferrerContextProps | undefined>(
  undefined
);

function ReferrerProvider({ children }: ReferrerProviderProps) {
  const [referrer, setReferrer] = useState('');
  const [referrerSettings, setReferrerSettings] = useState<
    ReferrerSettings | undefined
  >(undefined);

  useEffect(() => {
    const storedReferrer = JSONSessionStorage.get('referrer');

    if (document.referrer && !storedReferrer) {
      const ref = parseReferrer(document.referrer);
      JSONSessionStorage.set('referrer', ref);
      setReferrer(ref);
    } else {
      setReferrer(storedReferrer || '');
    }
  }, []);

  useEffect(() => {
    if (referrer) {
      switch (referrer) {
        case parseReferrer(ATOF_BASE_URL):
          setReferrerSettings(REFERRER_SETTINGS.atof);
          break;
        case parseReferrer(EXT_REGISTRATION_SERVICE_URL):
          setReferrerSettings(REFERRER_SETTINGS.ext_service);
          break;
        default:
          return;
      }
    }
  }, [referrer]);

  return (
    <ReferrerContext.Provider
      value={{
        referrer,
        referrerSettings,
      }}
    >
      {children}
    </ReferrerContext.Provider>
  );
}

function useReferrerContext() {
  const context = useContext(ReferrerContext);

  if (context === undefined) {
    throw new Error('useRefererContext must be used within a RefererProvider');
  }

  return context;
}

export { ReferrerContext, ReferrerProvider, useReferrerContext };
