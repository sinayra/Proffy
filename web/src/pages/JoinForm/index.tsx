import React, { FormEvent, useContext, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom'
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import { AuthContext } from '../../provider/AuthProvider';

import './styles.css';
import smileIcon from "../../assets/images/icons/smile.svg";
import { Enum } from '../../types/Enum';

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

const LOGIN_USER = gql`
    mutation login($account: LoginInput!){
    login(account: $account){
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


function JoinForm() {
    const { loading, error } = useQuery<Enum>(AREAENUM);
    const auth = useContext(AuthContext);
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login] = useMutation(LOGIN_USER);

    async function handleSubmit(e: FormEvent) {
        try {
            e.preventDefault();
            const account = {
                email,
                password,
            };


            const res = await login({ variables: { account } });

            if(!res.data.login.success){
                throw new Error (res.data.login.message);
            }

            auth?.setAuthInfo(res.data?.login.user);
            alert('Welcome back!');
            history.push('/');
        }
        catch (err) {
            alert('Error in login');
            console.error(err);
        }

    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return (
        <div id="page-join-form" className="container">
            <PageHeader title="Welcome to Proffy!" />

            <main>
                <form onSubmit={handleSubmit}>
                    <fieldset>

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
                            type="password"
                            value={password}
                            onChange={
                                (e) => {
                                    setPassword(e.target.value)
                                }
                            }
                        />

                        <button type="submit">
                            Login
                        </button>
                    </fieldset>

                    <footer>
                        <p>
                            <img src={smileIcon} alt="Smile" />
                            Don't have an account yet? Join us now!
                        </p>
                        <Link to="/teacher">
                            I am a Teacher
                        </Link>
                        <Link to="/student">
                            I am a Student
                        </Link>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default JoinForm;