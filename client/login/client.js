const handleLogin = (e) => {
    e.preventDefault();
    $("#domoMessage").animate({width:'hide'}, 350);
    if($("#user").val() ==''||$("#pass").val() ==''){
        handleError("RAWR! Username or password is empty");
        return false;
    }

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
    return false;
}

const handleSignup = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if($("#user").val() =='' || $("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("All fields required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()){
        handleError("passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    return false;
}

class NavLinks extends React.Component {
    constructor(props){
        super();
    }
    render() {
        return(
            <div>
                <a href="/login"><img id="logo" src="/assets/img/face.png" alt="face logo"/></a>
                <div className="navlink"><a id="loginButton" href="#" onClick={this.props.login}>Login</a></div>
                <div className="navlink"><a id="signupButton" href="#" onClick={this.props.signIn}>Sign up</a></div>
            </div>
        );
    }
};

const LoginWindow = (props) => {
    return(
        <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" className="mainForm">
            <input id="user" type="text" name="username" placeholder="username" />
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};

const SignupForm = (props) => {
    return(
        <form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" className="mainForm">

            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

class NavBarLogin extends React.Component {
    constructor(props){
        super();
    }
    render(){
        return(
                <nav>
                    <NavLinks login={this.props.login} signIn={this.props.signIn} ></NavLinks>
                    <LoginWindow csrf={this.props.csrf}></LoginWindow>
                </nav>
        );
    }
}

class SignupWindow extends React.Component {
    constructor(props){
        super();
    }
    render(){
        return(
            <div>
                <nav>
                    <NavLinks login={this.props.login} signIn={this.props.signIn}></NavLinks>
                </nav>
                <SignupForm csrf={this.props.csrf}></SignupForm>
            </div>
        )
    }
};

class Main extends React.Component {
    render(){
        return(
            <div id="main">
                <div className="homeContent" id="one">this describes what the app does</div>
                <div className="homeContent" id="two"> this describes what the app could do for you</div>
                <div className="homeContent" id="three">wowee sign up </div>
            </div>
        );
    }
}

class LoginPage extends React.Component {
    constructor(props){
        super();
        this.state = {
            signInClick: false,
            loginClick: true
        };

        this.signIn = this.signIn.bind(this);
        this.login = this.login.bind(this);
    }

    signIn() {
        this.setState(state => ({
            signInClick: true,
            loginClick: false
        }));
    }

    login(){
        this.setState(state => ({
            signInClick: false,
            loginClick: true
        }));
    }

    render() {
        return(
            <div>
                {console.dir("csrf" + this.props.csrf)}
                {this.state.loginClick ? <NavBarLogin login={this.login} signIn={this.signIn} csrf={this.props.csrf}></NavBarLogin> : null}
                {this.state.signInClick ? <SignupWindow login={this.login} signIn={this.signIn} csrf={this.props.csrf}></SignupWindow> : null }
                <Main></Main>
            </div>
        )
    }
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        ReactDOM.render(
            <LoginPage csrf={result.csrfToken}></LoginPage>,
            document.querySelector("body")
        );
    });
};

$(document).ready(function() {
    getToken();
});