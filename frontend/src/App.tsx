import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Contexts
import AppProvider from './hooks';

// Styles
import GlobalStyle from './styles/global';

// Routes
import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
