import React, { FormEvent, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import PageHeader from '../../components/PageHeader';

import { Teacher } from '../../types/Teacher';

import './styles.css';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Enum } from '../../types/Enum';
import weekdayOptions from '../../util/weekdayOption';
import { convertTimeStringToMinute } from '../../util/time';

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
    query getTeachers($teacher: TeacherInput) {
      teachers(teacher: $teacher) {
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
    const [area, setArea] = useState("");
    const [weekdayOption, setWeekdayOption] = useState("");
    const [weekday, setWeekday] = useState<number | null>(null);
    const [from, setFrom] = useState(0);

    const resTeacher = useQuery<ResponseData>(TEACHERS, {
        variables: {
            teacher: {
                area: area.length > 0 ? [area] : null,
                schedules: weekday !== null ?
                    [{
                        weekday,
                        from
                    }] : 
                    null
            }
        }
    });
    const resEnumArea = useQuery<Enum>(AREAENUM);

    const areaOptions = resEnumArea.data?.__type.enumValues.map((elem) => ({
        value: elem.name,
        label: elem.description
    }));
    const teachers = resTeacher.data?.teachers.teachers;

    async function resetSearch(e: FormEvent) {
        e.preventDefault();

        setArea("");
        setWeekdayOption("")
        setFrom(0);
    }


    //if (resTeacher.loading || resEnumArea.loading) return <p>Loading...</p>;
    if (resTeacher.error || resEnumArea.loading) return <p>Error :(</p>;

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="These are the Proffys availables.">
                <form id="search-teachers">

                    <Select
                        name="area"
                        label="Study field"
                        options={areaOptions}
                        value={area}
                        onChange={
                            (e) => {
                                setArea(e.target.value)
                            }
                        }
                    />
                    <Select
                        name="weekday"
                        label="Weekday"
                        options={weekdayOptions}
                        value={weekdayOption}
                        onChange={
                            (e) => {
                                setWeekdayOption(e.target.value);
                                setWeekday(parseInt(e.target.value));
                            }
                        }
                    />
                    <Input
                        type="time"
                        name="from"
                        label="Start at"
                        value={from}
                        onChange={
                            (e) => {
                                setFrom(convertTimeStringToMinute(e.target.value));
                            }
                        }
                    />
                    <button type="submit" onClick={resetSearch}>
                        Reset search
                    </button>

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