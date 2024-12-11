const helper = require('./helper.js');
const React = require('react');
const {createRoot} = require('react-dom/client');
import BookGrid from './components/BookGrid.jsx';

//should be what renders the grid of books after logging in
const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty');
        return false;
    }
    helper.sendPost(e.target.action, { username, pass }, (result) => {
        if (result.success) {
            // Render the BookGrid component upon successful login
            const root = createRoot(document.getElementById('content'));
            root.render(<BookGrid />);
        }
    });
    return false;
};

//signs you up into the database and allows logins
const handleSignup = (e) => {
    e.preventDefault();
     helper.hideError();

     const username = e.target.querySelector('#user').value
     const pass = e.target.querySelector('#pass').value
     const pass2 = e.target.querySelector('#pass2').value

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required');
        return false;
    }
    if ( pass !== pass2) {
        helper.handleError('Passwords do not match');
        return false;
    }
    helper.sendPost(e.target.action, {username, pass, pass2});
    return false;
}

//the actual login form that the user sees and utilizes 
const LoginWindow = (props) =>{
    return (
          <form id="loginForm"
          name="loginForm" 
          onSubmit={handleLogin}
          action="/login" 
          method = "POST"
          className='mainForm'
          >
    
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="user" placeholder='username' />

          <label htmlFor="pass">Password: </label>
          <input type="password" name="pass" id="pass" placeholder='password' />

          <input className='formSubmit' type="submit" value="Sign In" />
          </form>
     );
}

//the user sees this after pressing the sign up button
const SignupWindow = (props) =>{
    return (
          <form id="signupForm"
          name="signupForm" 
          onSubmit={handleSignup}
          action="/signup" 
          method = "POST"
          className='mainForm'
          >
    
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="user" placeholder='username' />

          <label htmlFor="pass">Password:</label>
          <input type="password" name="pass" id="pass" placeholder='password' />


          <label htmlFor="pass2">Confirm:</label>
          <input type="password" name="pass2" id="pass2" placeholder='retype password' />

          <input className='formSubmit' type="submit" value="Sign Up" />
          </form>
     );
}

//works to ensure the buttons click on this component page
const init = () => { 
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    const root = createRoot(document.getElementById('content'));

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<LoginWindow />);
        return false;
    });
    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<SignupWindow />);
        return false;
    });

     root.render(<LoginWindow />);

};

window.onload = init;