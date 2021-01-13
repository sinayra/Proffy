import React from 'react';
import { useQuery, gql } from '@apollo/client';

import logoImg from '../../assets/images/logo.svg';
import landingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import { Link } from 'react-router-dom';

import './styles.css';

interface User {
  _id: string;
}

interface ResponseData {
  users: {
    code: string;
    error: string;
    success: boolean;
    users: User[];
  }
}

const USERS = gql`
  query getUsers {
    users {
      users {
        _id
      }
    }
  }
`;

function Landing() {
  const { loading, error, data } = useQuery<ResponseData>(USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo=container">
          <img src={logoImg} alt="Proffy" />
          <h2>Your plataform to study at home</h2>
        </div>

        <img src={landingImg} className="hero-image" alt="Study at home Plataform" />
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Study" />
            Study
          </Link>

          <Link to="/teach" className="teach">
            <img src={giveClassesIcon} alt="Teach" />
            Teach
          </Link>
        </div>

        <span className="total-connections">
          Total of {data?.users.users.length} connections made<img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
      </div>
    </div>
  );
}

export default Landing;