import React from 'react';
import { SessionProvider } from 'next-auth/react';

const MockSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const session = {
    user: { id: '1', name: 'Test User', email: 'test@example.com', roles: ['admin'] },
    accessToken: 'dummy-token',
    expires: '9999-12-31T23:59:59.999Z', // Add a valid ISO date string
  };
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default MockSessionProvider;