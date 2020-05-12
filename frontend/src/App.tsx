import React from 'react';

// Context
import { AuthProvider } from './context/AuthContext';

// Styles
import GlobalStyle from './styles/global';

// Routes
import SignIn from './pages/SignIn';
// import SignUp from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
