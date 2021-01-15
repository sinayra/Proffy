import React, { useContext } from 'react';
import { Teacher } from '../../types/Teacher';
import { AuthContext } from '../../provider/AuthProvider';
import {  gql, useMutation } from '@apollo/client';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
interface TeacherItemProps {
    teacher: Teacher;
}

const ADD_CONNECTION = gql`
    mutation addConnection($teacherId: ID!){
        addTeacherStudentConnection(teacherId: $teacherId){
            success
            message
            student{
                _id
            }
        }
    }
`;

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    const src = teacher.user.avatar.includes('http') ? teacher.user.avatar : `http://localhost:4000/${teacher.user.avatar}`;
    const [addConnection] = useMutation(ADD_CONNECTION);
    const auth = useContext(AuthContext);

    async function handleAddConnection(){
        await addConnection({
            variables: {
                teacherId : teacher._id
            }
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={src} alt={teacher.user.name} />
                <div>
                    <strong>{teacher.user.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>Price/Hour: <strong>{teacher.price}</strong></p>
                {auth?.isStudent &&
                    <a target="_blank" rel="noreferrer" href={`https://wa.me/${teacher.user.whatsapp}`} type="button" onClick={handleAddConnection}>
                        <img src={whatsappIcon} alt="Whatsapp" />
                        Contact me
                    </a>
                }
            </footer>
        </article>
    )

}

export default TeacherItem;