//import React
import React, {Component}  from 'react';

import Form from "./Form";

export default class CreateCourse extends Component {

    state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      userId: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      errors: [],
    };

    componentDidMount(){
        const { context } = this.props;
        this.setState(() => {
            return {
                userId: context.authenticatedUser.id,
                firstName: context.authenticatedUser.firstName,
                lastName: context.authenticatedUser.lastName,
            };
        });
    };

    //NO ERROR HANDLERS!!!

    render(){

        const {
            errors,
        } = this.state;

        return(
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {/*<div>*/}
                    {/*    <h2 className="validation--errors--label">Validation errors</h2>*/}
                    {/*    <div className="validation-errors">*/}
                    {/*        <ul>*/}
                    {/*            <li>Please provide a value for "Title"</li>*/}
                    {/*            <li>Please provide a value for "Description"</li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
                        elements={()=>(
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="input-title course--title--input"
                                            onChange={this.change}
                                            placeholder="Course title..."
                                        />
                                    </div>
                                    <p>By {this.state.firstName + " " + this.state.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea
                                            id="description"
                                            name="description"
                                            type="text"
                                            onChange={this.change}
                                            placeholder="Course description...">
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input
                                                    id="estimatedTime"
                                                    name="estimatedTime"
                                                    type="text"
                                                    className="course--time--input"
                                                    onChange={this.change}
                                                    placeholder="Hours"
                                                />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea
                                                    id="materialsNeeded"
                                                    name="materialsNeeded"
                                                    onChange={this.change}
                                                    placeholder="List materials...">
                                                </textarea>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/*<div className="grid-100 pad-bottom">*/}
                            {/*    <button className="button" type="submit">Create Course</button>*/}
                            {/*    <button className="button button-secondary"*/}
                            {/*            onClick="event.preventDefault(); location.href='/';">Cancel*/}
                            {/*    </button>*/}
                            {/*</div>*/}

                        </React.Fragment>
                    )} />
                </div>
            </div>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    };

    submit = () => {
        const { context } = this.props;
        const authUser = context.authenticatedUser;

        const emailAddress = authUser.emailAddress;
        const password = authUser.password;
        console.log(emailAddress);
        console.log(password);

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            errors,
        } = this.state;


        // Create course
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
            errors,
        };



        context.data
            .createCourse(emailAddress, password, course)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    console.log("Course created");
                    this.props.history.push('/courses');
                }
            })
            .catch((err) => {
                console.log(err);
                this.props.history.push('/error');
            });

    };

    cancel = () => {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        this.props.history.push(from);
    }

}
