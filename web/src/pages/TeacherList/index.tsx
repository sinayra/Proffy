import React from 'react';
import { useQuery, gql } from '@apollo/client';

import PageHeader from '../../components/PageHeader';

import { Teacher } from '../../types/Teacher';

import './styles.css';
import TeacherItem from '../../components/TeacherItem';

interface ResponseData {
    teachers: {
        teachers: Teacher[]
    }
}

const TEACHERS = gql`
    query getTeachers {
      teachers {
        teachers {
            _id
            user {
                name
                email
                avatar
                whatsapp
            }
            area
            price
            bio
        }
        }
    }
  `;

function TeacherList() {
    const { loading, error, data } = useQuery<ResponseData>(TEACHERS);

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
                {data?.teachers.teachers.map((teacher) => (
                    <TeacherItem teacher={teacher} key={teacher._id} />
                ))}
            </main>
        </div>
    );
}

export default TeacherList;