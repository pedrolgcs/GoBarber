import React from 'react';

// Styles
import GlobalStyle from './styles/global';

// Routes
import SignIn from './pages/SignIn';
// import SignUp from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
      <SignIn />
      <GlobalStyle />
    </>
  );
};

export default App;
