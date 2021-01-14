import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';

import './styles.css';
import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import { Enum } from '../../types/Enum';
import weekdayOption from '../../util/weekdayOption';

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

function TeacherForm() {
    const { loading, error, data } = useQuery<Enum>(AREAENUM);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const options = data?.__type.enumValues.map((elem) => ({
        value: elem.name,
        label: elem.description
    }));

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="It's awesome that you want to teach others!" description="The first step is fill this form" />

            <main>
                <fieldset>
                    <legend>Your data</legend>

                    <Input name="name" label="Full name" />
                    <Input name="avatar" label="Avatar" />
                    <Input name="whatsapp" label="Whatsapp" />
                    <Textarea name="bio" label="About yourself" />

                </fieldset>

                <fieldset>
                    <legend>About your classes</legend>

                    <Select name="area" label="Study field" options={options} />
                    <Input name="price" label="Price of your hour class" />

                </fieldset>

                <fieldset>
                    <div className="available-schedules">
                        <legend>
                            Availability
                        </legend>
                        <button type="button"> + New schedule</button>
                    </div>

                    <div className="schedule-item">
                        <Select name="weekday" label="Weekday" options={weekdayOption} />
                        <Input name="from" label="From" type="time" />
                        <Input name="to" label="To" type="time" />
                    </div>

                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Important message" />
                        Important! <br />
                        Fill all the fields
                    </p>
                    <button type="button">
                        Save
                    </button>
                </footer>
            </main>
        </div>
    );
}

export default TeacherForm;