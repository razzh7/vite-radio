import React from 'react';

export default React.createContext<{
  value: string | number;
  check: (value: string | number) => void;
  uncheck: () => void;
} | null>(null)