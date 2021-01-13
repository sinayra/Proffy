import React from 'react';
import './assets/styles/global.css';
import ApolloProvider from './provider/ApolloProvider';
import Routes from './routes';

function App() {
  return (
    <ApolloProvider>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
