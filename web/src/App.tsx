import React from 'react';
import './assets/styles/global.css';
import ApolloProvider from './provider/ApolloProvider';
import AuthProvider from './provider/AuthProvider';
import Routes from './routes';

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
