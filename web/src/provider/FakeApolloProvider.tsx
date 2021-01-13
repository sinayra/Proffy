import React, { ReactNode } from 'react';
import {
  ApolloProvider as Provider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  Resolvers
} from '@apollo/client';
import { gql } from '@apollo/client';
import faker from 'faker';
import { User } from '../types/User';
import { Teacher } from '../types/Teacher';

interface Props {
  children: ReactNode;
}


const typeDefs = gql`
  type Query {
    users: [User]
    teachers: [Teacher]
  }

  type User {
    _id: ID!
    email: String!
    role: Role!
    name: String!
    avatar: String
    whatsapp: String
  }

  type Teacher {
    _id: ID!
    user: User!
    bio: String
    subject: String
    price: String
  }

  enum Role {
    TEACHER
    STUDENT
  }
`;

function generateUser() {
  const user: User = {
    _id: faker.random.uuid(),
    email: faker.internet.email(),
    role: Math.floor(Math.random() * Math.floor(100)) % 2 === 0 ? 'TEACHER' : 'STUDENT',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    avatar: faker.image.image(),
    whatsapp: faker.phone.phoneNumber()
  }

  return user;
}

function generateTeacher(user: User) {
  const teacher: Teacher = {
    _id: faker.random.uuid(),
    user,
    bio: faker.lorem.paragraphs(),
    area: [faker.lorem.word()],
    price: faker.finance.amount(10, 50),
  }

  return teacher;
}

const resolvers: Resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      const users: User[] = [];

      for (let i = 0; i < 200; i++) {
        users.push(generateUser());
      }
      return users;
    },

    teachers: (parent, args, context, info) => {
      const teachers: Teacher[] = [];

      for (let i = 0; i < 200; i++) {
        const user = generateUser();

        if (user.role === 'TEACHER') {
          teachers.push(generateTeacher(user));
        }

      }
      return teachers;
    },
  }
};

function FakeApolloProvider({ children }: Props) {

  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include"
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    typeDefs,
    resolvers
  });

  return (
    <Provider client={client}>
      {children}
    </Provider>
  );
}

export default FakeApolloProvider;