import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ setTokenInMemoryAndInCookie }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newsletterSubscription, setNewsletterSubscription] = useState(false);
    let history = useHistory();

    const handleToken = async () => {
        let newToken = "";
        let response = null;
        try {
            console.log("ce qui va être posté : ", {
                username: username,
                email: email,
                password: password,
            });
            response = await axios.post(
                //"http://localhost:3000/user/signup",
                "https://le-reacteur-vinted.herokuapp.com/user/signup",
                //"https://lereacteur-vinted-api.herokuapp.com/user/signup",
                {
                    username: username,
                    email: email,
                    password: password,
                }
            );
            newToken = response.data.token;
            console.log("resp dat", response.data);
            if (newToken) {
                setTokenInMemoryAndInCookie(newToken);
                history.push("/");
            } else {
                setTokenInMemoryAndInCookie(newToken);
            }
        } catch (error) {
            console.log("An error occured : ", error);
            if (response) {
                console.log("resp", response);
            } else {
                console.log("no resp");
            }
            setTokenInMemoryAndInCookie(newToken);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleToken();
    };

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
    };
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
    };

    const handleNewsletterSubscriptionChange = (event) => {
        const value = event.target.value;
        setNewsletterSubscription(value);
    };

    return (
        <div className="container-login-signup">
            <div className="signup-login-page-title">S'inscrire</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={handleUsernameChange}
                    className="signup-login-input"
                />
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
                <input
                    type="checkbox"
                    name="newsletterSubscription"
                    value={newsletterSubscription}
                    onChange={handleNewsletterSubscriptionChange}
                    className="signup-login-checkbox"
                />
                <label>S'inscrire à notre newsletter</label>
                <div className="signup-i-confirm-sentence">
                    En m'inscrivant je confirme avoir lu et accepté les Termes &
                    Conditions et Politique de Confidentialité de Vinted. Je
                    confirme avoir au moins 18 ans.
                </div>
                <button type="submit" className="signup-login-button">
                    S'inscrire
                </button>
            </form>
            <Link to="/login" className="signup-login-switch">
                <div>Tu as déjà un compte ? Connecte-toi !</div>
            </Link>
        </div>
    );
};

export default Signup;
