import React, { useEffect, Dispatch, SetStateAction } from "react";
import { useQuery, gql } from '@apollo/client';
import { User } from "../types/User";

interface AuthContextProps {
    authInfo: User | null,
    setAuthInfo: Dispatch<SetStateAction<User | null>>
    isAuthenticated: boolean,
    isTeacher: boolean,
    isStudent: boolean,
}

const GETUSER = gql`
    query getUser{
    currentUser{
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

export const AuthContext = React.createContext<AuthContextProps | null>(null);
const Provider = AuthContext.Provider;

const AuthProvider: React.FC = ({ children }) => {
    const [authInfo, setAuthInfo] = React.useState<User | null>(null);
    const resUser = useQuery(GETUSER);

    const isAuthenticated = authInfo !== null ? true : false;
    const isTeacher = authInfo?.role === "TEACHER";
    const isStudent = authInfo?.role === "STUDENT";

    //Workaround to get user info from cookie
    /*useEffect(() => {
        if(authInfo === null){
            resUser.refetch();

            if (resUser.data && resUser.data.currentUser.user !== null) {
                setAuthInfo(resUser.data.currentUser.user);
            }
        }
    }, [authInfo, resUser]);*/

    return (
        <Provider value={{ authInfo, isAuthenticated, isTeacher, isStudent, setAuthInfo }}>
            {children}
        </Provider>
    );
}

export default AuthProvider;
