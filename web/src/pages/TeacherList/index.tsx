import React from 'react';
import { useQuery, gql } from '@apollo/client';

import PageHeader from '../../components/PageHeader';

import { Teacher } from '../../types/Teacher';

import './styles.css';
import TeacherItem from '../../components/TeacherItem';

interface TeacherData {
    teachers: Teacher[];
}

const TEACHERS = gql`
    query getTeachers {
      teachers @client {
        id
        user {
            name
            email
            avatar
            whatsapp
        }
        subject
        price
        bio
      }
    }
  `;

function TeacherList() {
    const { loading, error, data } = useQuery<TeacherData>(TEACHERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="These are the Proffys availables.">
                <form id="search-teachers">

                    <div className="input-block">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" />
                    </div>

                    <div className="input-block">
                        <label htmlFor="weekday">Weekday</label>
                        <input type="text" id="weekday" />
                    </div>

                    <div className="input-block">
                        <label htmlFor="hour">Hour</label>
                        <input type="text" id="hour" />
                    </div>

                </form>
            </PageHeader>

            <main>
                {data?.teachers.map((teacher) => (
                    <TeacherItem teacher={teacher} key={teacher.id} />
                ))}
            </main>
        </div>
    );
}

export default TeacherList;