import 'client-only';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaMatcher = window.matchMedia(query);

    function handleChange() {
      setMatches(mediaMatcher.matches);
    }

    handleChange();
    mediaMatcher.addEventListener('change', handleChange);
    return () => {
      mediaMatcher.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
