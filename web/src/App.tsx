import React from 'react';
import './assets/styles/global.css';
import FakeApolloProvider from './provider/FakeApolloProvider';
import Routes from './routes';

function App() {
  return (
    <FakeApolloProvider>
      <Routes />
    </FakeApolloProvider>
  );
}

export default App;
