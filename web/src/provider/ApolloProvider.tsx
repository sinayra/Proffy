import React, { ReactNode } from 'react';
import {
  ApolloProvider as Provider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

interface Props {
  children: ReactNode;
}


function ApolloProvider({ children }: Props) {

  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
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