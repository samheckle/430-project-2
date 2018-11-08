"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var handleLogin = function handleLogin(e) {
    e.preventDefault();
    $("#domoMessage").animate({ width: 'hide' }, 350);
    if ($("#user").val() == '' || $("#pass").val() == '') {
        handleError("RAWR! Username or password is empty");
        return false;
    }

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
    return false;
};

var handleSignup = function handleSignup(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    return false;
};

var NavLinks = function (_React$Component) {
    _inherits(NavLinks, _React$Component);

    function NavLinks(props) {
        _classCallCheck(this, NavLinks);

        return _possibleConstructorReturn(this, (NavLinks.__proto__ || Object.getPrototypeOf(NavLinks)).call(this));
    }

    _createClass(NavLinks, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "a",
                    { href: "/login" },
                    React.createElement("img", { id: "logo", src: "/assets/img/face.png", alt: "face logo" })
                ),
                React.createElement(
                    "div",
                    { className: "navlink" },
                    React.createElement(
                        "a",
                        { id: "loginButton", href: "#", onClick: this.props.login },
                        "Login"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "navlink" },
                    React.createElement(
                        "a",
                        { id: "signupButton", href: "#", onClick: this.props.signIn },
                        "Sign up"
                    )
                )
            );
        }
    }]);

    return NavLinks;
}(React.Component);

;

var LoginWindow = function LoginWindow(props) {
    return React.createElement(
        "form",
        { id: "loginForm", name: "loginForm", onSubmit: handleLogin, action: "/login", method: "POST", className: "mainForm" },
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign in" })
    );
};

var SignupForm = function SignupForm(props) {
    return React.createElement(
        "form",
        { id: "signupForm", name: "signupForm", onSubmit: handleSignup, action: "/signup", method: "POST", className: "mainForm" },
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
        React.createElement(
            "label",
            { htmlFor: "pass" },
            "Password: "
        ),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
        React.createElement(
            "label",
            { htmlFor: "pass2" },
            "Password: "
        ),
        React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign Up" })
    );
};

var NavBarLogin = function (_React$Component2) {
    _inherits(NavBarLogin, _React$Component2);

    function NavBarLogin(props) {
        _classCallCheck(this, NavBarLogin);

        return _possibleConstructorReturn(this, (NavBarLogin.__proto__ || Object.getPrototypeOf(NavBarLogin)).call(this));
    }

    _createClass(NavBarLogin, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "nav",
                null,
                React.createElement(NavLinks, { login: this.props.login, signIn: this.props.signIn }),
                React.createElement(LoginWindow, { csrf: this.props.csrf })
            );
        }
    }]);

    return NavBarLogin;
}(React.Component);

var SignupWindow = function (_React$Component3) {
    _inherits(SignupWindow, _React$Component3);

    function SignupWindow(props) {
        _classCallCheck(this, SignupWindow);

        return _possibleConstructorReturn(this, (SignupWindow.__proto__ || Object.getPrototypeOf(SignupWindow)).call(this));
    }

    _createClass(SignupWindow, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "nav",
                    null,
                    React.createElement(NavLinks, { login: this.props.login, signIn: this.props.signIn })
                ),
                React.createElement(SignupForm, { csrf: this.props.csrf })
            );
        }
    }]);

    return SignupWindow;
}(React.Component);

;

var Main = function (_React$Component4) {
    _inherits(Main, _React$Component4);

    function Main() {
        _classCallCheck(this, Main);

        return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
    }

    _createClass(Main, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "main" },
                React.createElement(
                    "div",
                    { className: "homeContent", id: "one" },
                    "this describes what the app does"
                ),
                React.createElement(
                    "div",
                    { className: "homeContent", id: "two" },
                    " this describes what the app could do for you"
                ),
                React.createElement(
                    "div",
                    { className: "homeContent", id: "three" },
                    "wowee sign up "
                )
            );
        }
    }]);

    return Main;
}(React.Component);

var LoginPage = function (_React$Component5) {
    _inherits(LoginPage, _React$Component5);

    function LoginPage(props) {
        _classCallCheck(this, LoginPage);

        var _this5 = _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call(this));

        _this5.state = {
            signInClick: false,
            loginClick: true
        };

        _this5.signIn = _this5.signIn.bind(_this5);
        _this5.login = _this5.login.bind(_this5);
        return _this5;
    }

    _createClass(LoginPage, [{
        key: "signIn",
        value: function signIn() {
            this.setState(function (state) {
                return {
                    signInClick: true,
                    loginClick: false
                };
            });
        }
    }, {
        key: "login",
        value: function login() {
            this.setState(function (state) {
                return {
                    signInClick: false,
                    loginClick: true
                };
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                console.dir("csrf" + this.props.csrf),
                this.state.loginClick ? React.createElement(NavBarLogin, { login: this.login, signIn: this.signIn, csrf: this.props.csrf }) : null,
                this.state.signInClick ? React.createElement(SignupWindow, { login: this.login, signIn: this.signIn, csrf: this.props.csrf }) : null,
                React.createElement(Main, null)
            );
        }
    }]);

    return LoginPage;
}(React.Component);

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        ReactDOM.render(React.createElement(LoginPage, { csrf: result.csrfToken }), document.querySelector("body"));
    });
};

$(document).ready(function () {
    getToken();
});
var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};