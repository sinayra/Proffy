import React from 'react';
import {
  ApolloProvider as Provider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

const ApolloProvider: React.FC = ( { children }) => {

  const httpLink = createHttpLink({
    uri: "https://backend-sinayra.azurewebsites.net/graphql",
    credentials: "include"
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <Provider client={client}>
      {children}
    </Provider>
  );
}

export default ApolloProvider;