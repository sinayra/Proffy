import React from 'react';
import { Teacher } from '../../types/Teacher';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    return (
        <article className="teacher-item">
            <header>
                <img src={`http://localhost:4000/${teacher.user.avatar}`} alt={teacher.user.name} />
                <div>
                    <strong>{teacher.user.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>Price/Hour: <strong>{teacher.price}</strong></p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Contact me
                </button>
            </footer>
        </article>
    )

}

export default TeacherItem;