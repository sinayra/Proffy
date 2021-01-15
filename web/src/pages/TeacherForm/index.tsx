import React, { FormEvent, useContext, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom'
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';

import './styles.css';
import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import { Enum } from '../../types/Enum';
import weekdayOption from '../../util/weekdayOption';
import { convertTimeStringToMinute } from '../../util/time';
import { AuthContext } from '../../provider/AuthProvider';

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

const SIGNUP_USER = gql`
    mutation signup_user($account: SignupInput!){
    signup(account: $account){
            user{
                _id
            }
        }
    }
`;

const UPDATE_TEACHER = gql`
    mutation update_teacher($teacherInput: TeacherInput!){
    updateTeacher(teacherInput: $teacherInput){
            teacher{
                _id
            }
        }
    }
`;

interface Schedule {
    weekday: string,
    from: string,
    to: string
}

function TeacherForm() {
    const { loading, error, data } = useQuery<Enum>(AREAENUM);
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [scheduleItems, setScheduleItems] = useState<Schedule[]>([{ weekday: '', from: '', to: '' }]);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");
    const [area, setArea] = useState("");
    const [price, setPrice] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signup] = useMutation(SIGNUP_USER);
    const [update] = useMutation(UPDATE_TEACHER);

    async function handleSubmit(e: FormEvent) {
        try {
            e.preventDefault();
            const account = {
                name,
                email,
                password,
                whatsapp,
                avatar,
                role: "TEACHER"
            };

            const schedules = scheduleItems.map(elem => {

                return {
                    weekday: parseInt(elem.weekday),
                    from: convertTimeStringToMinute(elem.from),
                    to: convertTimeStringToMinute(elem.to)
                }
            })

            const teacherInput = {
                bio,
                price,
                area: [area],
                schedules
            }

            const res = await signup({ variables: { account } });
            await update({ variables: { teacherInput } });

            alert('Congratulations! Your account has been successfully created!');
            auth?.setAuthInfo(res.data?.login.user);
            history.push('/');
        }
        catch (err) {
            alert('Error in creating account!');
            console.error(err);
        }

    }

    function addNewSchedule() {
        setScheduleItems([...scheduleItems, { weekday: '', from: '', to: '' }]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((elem, index) => {
            if (index === position) {
                return {
                    ...elem, [field]: value
                }
            }

            return elem;
        });

        setScheduleItems(updatedScheduleItems);
    }

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
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Your data</legend>

                        <Input
                            name="name"
                            label="Full name"
                            value={name}
                            onChange={
                                (e) => {
                                    setName(e.target.value)
                                }
                            }
                        />
                        <Input
                            name="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={
                                (e) => {
                                    setEmail(e.target.value)
                                }
                            }
                        />
                        <Input
                            name="password"
                            label="Password"
                            type="text"
                            value={password}
                            onChange={
                                (e) => {
                                    setPassword(e.target.value)
                                }
                            }
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={
                                (e) => {
                                    setAvatar(e.target.value)
                                }
                            }
                        />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={
                                (e) => {
                                    setWhatsapp(e.target.value)
                                }
                            }
                        />
                        <Textarea
                            name="bio"
                            label="About yourself"
                            value={bio}
                            onChange={
                                (e) => {
                                    setBio(e.target.value)
                                }
                            }
                        />

                    </fieldset>

                    <fieldset>
                        <legend>About your classes</legend>

                        <Select
                            name="area"
                            label="Study field"
                            options={options}
                            value={area}
                            onChange={
                                (e) => {
                                    setArea(e.target.value)
                                }
                            }
                        />
                        <Input
                            name="price"
                            label="Price of your hour class"
                            value={price}
                            onChange={
                                (e) => {
                                    setPrice(e.target.value)
                                }
                            }
                        />

                    </fieldset>

                    <fieldset>
                        <div className="available-schedules">
                            <legend>
                                Availability
                        </legend>
                            <button type="button" onClick={addNewSchedule}> + New schedule</button>
                        </div>
                        {
                            scheduleItems.map((item, index) => (
                                <div key={index} className="schedule-item">
                                    <Select
                                        name="weekday"
                                        label="Weekday"
                                        options={weekdayOption}
                                        value={item.weekday}
                                        onChange={
                                            e => setScheduleItemValue(index, 'weekday', e.target.value)
                                        }
                                    />
                                    <Input
                                        name="from"
                                        label="From"
                                        type="time"
                                        value={item.from}
                                        onChange={
                                            e => setScheduleItemValue(index, 'from', e.target.value)
                                        }
                                    />
                                    <Input
                                        name="to"
                                        label="To"
                                        type="time"
                                        value={item.to}
                                        onChange={
                                            e => setScheduleItemValue(index, 'to', e.target.value)
                                        }
                                    />
                                </div>
                            ))
                        }


                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Important message" />
                            Important! <br />
                            Fill all the fields
                        </p>
                        <button type="submit">
                            Save
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;