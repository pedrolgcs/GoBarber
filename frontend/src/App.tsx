import React from 'react';

// Context
import { AuthProvider } from './hooks/AuthContext';

// Styles
import GlobalStyle from './styles/global';
import ToastContainer from './components/ToastContainer';

// Routes
import SignIn from './pages/SignIn';
// import SignUp from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <ToastContainer />
      <GlobalStyle />
    </>
  );
};

export default App;
