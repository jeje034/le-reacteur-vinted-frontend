import { SyntheticEvent, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import { useAppDispatch } from "../../app/hooks";
import { setUserIds } from "../../app/connectedUserSlice";
import SaveUserIds from "../../functions/SaveUserIds";
import * as Constants from "../../constants/constants";
import GetBackendBaseUrl from "../../functions/GetBackendBaseUrl";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [password, setPassword] = useState("");
    const [newsletterSubscription, setNewsletterSubscription] = useState(false);

    let history = useHistory();

    const dispatch = useAppDispatch();

    const handleToken = async () => {
        let newToken = null;
        try {
            const response = await axios.post(
                GetBackendBaseUrl() + "/user/signup",
                {
                    username: username,
                    email: email,
                    password: password,
                }
            );
            newToken = response.data.token;
            dispatch(setUserIds({ token: newToken, id: response.data._id }));
            SaveUserIds({ userToken: newToken, userId: response.data._id });
            if (newToken) {
                history.push("/");
            }
        } catch (error) {
            console.log("An error occured :", error.message);
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                if (
                    error.response.data.error.message ===
                    "this email has already an account."
                ) {
                    setErrorMessage("Cet email a déjà un compte chez nous !");
                } else if (
                    error.response.data.error.message === "Missing parameters."
                ) {
                    setErrorMessage(
                        "Le nom d'utilisateur, l'email et le mot de passe sont obligatoires."
                    );
                }
            }
            dispatch(setUserIds({ token: "", id: "" }));
            SaveUserIds({ userToken: "", userId: "" });
        }
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        handleToken();
    };

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setUsername(value);
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEmail(value);
        setErrorMessage("");
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setPassword(value);
    };

    const handleNewsletterSubscriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        //const value = event.target.value; Ne fonctionne pas : value vaut toujours "false"
        const newNewsletterSubscription = !newsletterSubscription;
        setNewsletterSubscription(newNewsletterSubscription);
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
                    data-testid="signup-username-input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="signup-login-input"
                    data-testid="signup-email-input"
                />
                {errorMessage && (
                    <div className="signup-login-error-message">
                        {errorMessage}
                    </div>
                )}
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={handlePasswordChange}
                    className="signup-login-input"
                    data-testid="signup-password-input"
                    autoComplete="off"
                />
                <input
                    type="checkbox"
                    name="newsletterSubscription"
                    value={newsletterSubscription.toString()}
                    onChange={handleNewsletterSubscriptionChange}
                    className="signup-checkbox"
                />
                <label className="signup-checkbox-label">
                    S'inscrire à notre newsletter
                </label>
                <div className="signup-i-confirm-sentence">
                    En m'inscrivant je confirme avoir lu et accepté les Termes &
                    Conditions et Politique de Confidentialité de Vinted. Je
                    confirme avoir au moins 18 ans.
                </div>
                <button
                    type="submit"
                    className="signup-login-button"
                    data-testid="signup-signup-button"
                >
                    S'inscrire
                </button>
            </form>
            <Link
                to="/login"
                className="signup-login-switch"
                data-testid="signup-switch-to-login"
            >
                <div>Tu as déjà un compte ? Connecte-toi !</div>
            </Link>
        </div>
    );
};

export default Signup;
