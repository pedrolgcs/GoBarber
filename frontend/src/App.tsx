import React from 'react';

// Styles
import GlobalStyle from './styles/global';

// Routes
import SignIn from './pages/SignIn';

const App: React.FC = () => {
  return (
    <>
      <SignIn />
      <GlobalStyle />
    </>
  );
};

export default App;
