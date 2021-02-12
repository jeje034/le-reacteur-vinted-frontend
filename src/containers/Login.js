import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setTokenInMemoryAndInCookie }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    let history = useHistory();

    const handleToken = async () => {
        let newToken = "";
        try {
            const response = await axios.post(
                //"http://localhost:3000/user/login",
                "https://le-reacteur-vinted.herokuapp.com/user/login",
                //"https://lereacteur-vinted-api.herokuapp.com/user/login",
                {
                    email: email,
                    password: password,
                }
            );
            newToken = response.data.token;
            if (newToken) {
                setTokenInMemoryAndInCookie(newToken);
                history.push("/");
            } else {
                setLoginError(true);
                setTokenInMemoryAndInCookie(newToken);
            }
        } catch (error) {
            setLoginError(true);
            console.log("An error occured : ", error);
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