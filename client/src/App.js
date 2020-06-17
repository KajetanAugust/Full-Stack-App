import React, {Component} from 'react';

//import React Router elements
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './App.css';


//import components
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";

import Header from "./components/Header";

// Context (to be able to get app data without passing props)
import withContext from './Context';


const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);

class App extends Component {

    render(){
        return (
            <Router>
                <div id="root">
                    <div>
                        <HeaderWithContext/>
                        <hr/>
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to="/courses"/>} />
                            <Route exact path="/courses" component={CoursesWithContext} />
                            <Route path="/courses/create" component={CreateCourseWithContext} />
                            <Route path="/courses/:id" component={CourseDetailWithContext} />
                            <Route path='/signin' component={ UserSignInWithContext } />
                            <Route path='/signup' component={ UserSignUpWithContext } />
                            <Route path='/signout' component={ UserSignOutWithContext } />

                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
export default App;


