import React from 'react';

import { AuthProvider } from './auth';

const hooks: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default hooks;
