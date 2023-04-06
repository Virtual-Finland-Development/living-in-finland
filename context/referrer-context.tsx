import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface ReferrerContextProps {
  referrer: string;
}

interface ReferrerProviderProps {
  children: ReactNode;
}

const ReferrerContext = createContext<ReferrerContextProps | undefined>(
  undefined
);

function ReferrerProvider({ children }: ReferrerProviderProps) {
  const [referrer, setReferrer] = useState('');

  useEffect(() => {
    if (document.referrer) {
      // alternative, does not work when in local dev, since all are "localhost"
      /* const domain = new URL(document.referrer).hostname;
      console.log(domain); */

      const url = document.referrer;
      const parsed = url.match(/:\/\/(.[^/]+)/); // try to get domain only, in local localhost:port
      const ref = parsed ? parsed[1] : '';
      setReferrer(ref);
    }
  }, []);

  return (
    <ReferrerContext.Provider
      value={{
        referrer,
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
