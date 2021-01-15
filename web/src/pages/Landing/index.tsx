import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { Student } from '../../types/Student';
import logoImg from '../../assets/images/logo.svg';
import landingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import { Link } from 'react-router-dom';

import './styles.css';

interface ResponseData {
  students: {
    code: string;
    error: string;
    success: boolean;
    students: Student[];
  }
}

const CONNECTIONS = gql`
  query getConnections {
    students {
      students {
        connected {
          _id
        }
      }
    }
  }
`;

function Landing() {
  const { loading, error, data } = useQuery<ResponseData>(CONNECTIONS);
  let total = 0;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const students = data?.students.students;
  if(students){
    for(let i = 0; i < students?.length; i++){
      total += students[i].connected.length;
    }
  }

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

          <Link to="/join" className="join">
            <img src={giveClassesIcon} alt="Join" />
            Join
          </Link>
        </div>

        <span className="total-connections">
          Total of {total} connections made<img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
      </div>
    </div>
  );
}

export default Landing;