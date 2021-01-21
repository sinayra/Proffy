import React, { FormEvent, useContext, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom'
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';

import './styles.css';
import warningIcon from "../../assets/images/icons/warning.svg";
import { Enum } from '../../types/Enum';
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
            success
            message
            user{
                _id
                name
                email
                avatar
                role
                whatsapp
            }
        }
    }
`;


function StudentForm() {
    const { loading, error } = useQuery<Enum>(AREAENUM);
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signup] = useMutation(SIGNUP_USER);

    async function handleSubmit(e: FormEvent) {
        try {
            e.preventDefault();
            const account = {
                name,
                email,
                password,
                whatsapp,
                avatar,
                role: "STUDENT"
            };

            const res = await signup({ variables: { account } });

            if(!res.data.signup.success){
                throw new Error (res.data.signup.message);
            }

            auth?.setAuthInfo(res.data?.signup.user);
            alert('Congratulations! Your account has been successfully created!');
            history.push('/');
        }
        catch (err) {
            alert('Error in creating account!');
            console.error(err);
        }

    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return (
        <div id="page-student-form" className="container">
            <PageHeader title="Ready to learn with awesome teachers?" description="The first step is fill this form" />

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

export default StudentForm;