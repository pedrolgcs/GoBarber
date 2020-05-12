import React from 'react';

// Context
import AppProvider from './hooks';

// Styles
import GlobalStyle from './styles/global';

// Routes
import SignIn from './pages/SignIn';
// import SignUp from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
