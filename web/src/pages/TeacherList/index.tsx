import React from 'react';
import { useQuery, gql } from '@apollo/client';

import PageHeader from '../../components/PageHeader';

import { Teacher } from '../../types/Teacher';

import './styles.css';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Enum } from '../../types/Enum';
import weekdayOption from '../../util/weekdayOption';

interface ResponseData {
    teachers: {
        teachers: Teacher[]
    }
}

const AREAENUM = gql`
    query getAreaEnum{
    __type(name: "Area"){
        enumValues{
        name
        description
        }
    }
    }
`;

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
    const resTeacher = useQuery<ResponseData>(TEACHERS);
    const resEnumArea = useQuery<Enum>(AREAENUM);

    const teachers = resTeacher.data?.teachers.teachers;
    const areaOptions = resEnumArea.data?.__type.enumValues.map((elem) => ({
        value: elem.name,
        label: elem.description
    }));
    

    if (resTeacher.loading || resEnumArea.loading) return <p>Loading...</p>;
    if (resTeacher.error || resEnumArea.loading) return <p>Error :(</p>;

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="These are the Proffys availables.">
                <form id="search-teachers">

                    <Select name="area" label="Study field" options={areaOptions} />
                    <Select name="weekday" label="Weekday" options={weekdayOption} />
                    <Input type="time" name="from" label="Start at" />

                </form>
            </PageHeader>

            <main>
                {teachers?.map((teacher) => (
                    <TeacherItem teacher={teacher} key={teacher._id} />
                ))}
            </main>
        </div>
    );
}

export default TeacherList;