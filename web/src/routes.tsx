import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';
import StudentForm from './pages/StudentForm';
import Join from './pages/JoinForm';

function Routes(){

    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/study" component={TeacherList} />
            <Route path="/join" component={Join} />
            <Route path="/student" component={StudentForm} />
            <Route path="/teacher" component={TeacherForm} />
        </BrowserRouter>
    );
}

export default Routes;