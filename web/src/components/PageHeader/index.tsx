import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../../provider/AuthProvider';

import './styles.css';

interface PageHeaderProps {
    title: string;
    description?: string
}

const LOGOUT_USER = gql`
    mutation logout{
        logout{
            message
            success
        }
    }
`;


const PageHeader: React.FC<PageHeaderProps> = (props) => {
    const [logout] = useMutation(LOGOUT_USER);
    const auth = useContext(AuthContext);

    async function handleLogout() {
        await logout();
        auth?.setAuthInfo(null);
    }

    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Back" />
                </Link>
                {auth?.isAuthenticated ?
                    <button type="button" onClick={handleLogout}>
                        Log out
                    </button>
                    :
                    <img src={logoImg} alt="Proffy" />
                }

            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {props.description && <p>{props.description}</p>}

                {props.children}
            </div>
        </header>
    );
}

export default PageHeader;