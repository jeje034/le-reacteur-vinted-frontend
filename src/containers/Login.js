import { useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import axios from "axios";

const Login = ({ setTokenInMemoryAndInCookie, baseUrl }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    let history = useHistory();
    let location = useLocation();

    const handleToken = async () => {
        let newToken = null;
        try {
            const response = await axios.post(baseUrl + "/user/login", {
                email: email,
                password: password,
            });
            newToken = response.data.token;
            if (newToken) {
                setTokenInMemoryAndInCookie(newToken);
                if (location && location.state && location.state.fromPublish) {
                    //msgjs21 Il faudrait aussi regarder la redirection depuis l'inscription
                    history.push("/publish");
                } else {
                    history.push("/");
                }
            } else {
                setLoginError(true);
                setTokenInMemoryAndInCookie(newToken);
            }
        } catch (error) {
            setLoginError(true);
            console.log("An error occured:", error.message);
            setTokenInMemoryAndInCookie(newToken);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleToken();
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
    };

    return (
        <div className="container-login-signup">
            <div className="signup-login-page-title">Se connecter</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="signup-login-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={handlePasswordChange}
                    className="signup-login-input"
                />
                <div
                    className={
                        loginError
                            ? "signup-login-error-message"
                            : "signup-login-error-message visibility-hidden"
                    }
                >
                    Email ou mot de passe incorrect
                </div>
                <button type="submit" className="signup-login-button">
                    Se connecter
                </button>
            </form>
            {
                <Link to="/signup" className="signup-login-switch">
                    <div>Pas encore de compte ? Inscris-toi !</div>
                </Link>
            }
        </div>
    );
};

export default Login;
