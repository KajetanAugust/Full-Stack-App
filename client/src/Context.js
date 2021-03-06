import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null //if there is authenticated user stored in cookies get
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

//Sign in method
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password); //get user data
    if (user !== null) { //if there is a user
      user.password = password;
      this.setState(() => {
        return {
          authenticatedUser: user, //set user to authenticated user
        };
      });
      const cookieOptions = {
        expires: 1 // sets cookies memory to 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions); //store authenticated user in cookies
    }
    return user;
  };
//sign out method
  signOut = () => {
    this.setState({ authenticatedUser: null }); //remove authenticated user from state
    Cookies.remove('authenticatedUser'); //remove stored cookies
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

