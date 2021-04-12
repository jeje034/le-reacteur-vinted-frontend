import { SyntheticEvent, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import axios from "axios";
import SaveUserIds from "../../functions/SaveUserIds";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { AppThunk, RootState } from "../../app/store";
import {
    loginRequest,
    loginSucces,
    loginFail,
} from "../../app/connectedUserSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginError } = useAppSelector(
        (state: RootState) => state.connectedUser
    );
    const { baseUrl } = useAppSelector((state: RootState) => state.environment);

    const dispatch = useAppDispatch();

    let history = useHistory();
    let location = useLocation();

    const loginUser = (email: string, password: string): AppThunk => async (
        dispatch
    ) => {
        try {
            //D'abord on indique que la requête est en cours
            dispatch(loginRequest());

            //Puis on appelle l'API
            const response = await axios.post(baseUrl + "/user/login", {
                email: email,
                password: password,
            });
            if (response.data.token) {
                dispatch(loginSucces(response.data));
                SaveUserIds(response.data.token, response.data._id);

                interface ICustomState {
                    fromPublish: boolean;
                    fromPayment: boolean;
                }

                if (location) {
                    const customState = location.state as ICustomState;

                    if (customState && customState.fromPublish) {
                        //msgjs21 Il faudrait aussi regarder la redirection depuis l'inscription
                        history.push("/publish");
                    } else if (customState && customState.fromPayment) {
                        //history.push("/payment"); msgjs21 : si je vais vers payment, il me manque les paramètres (prix, produit) => je fais pour l'instant un go back
                        history.goBack();
                    } else {
                        history.push("/");
                    }
                } else {
                    history.push("/");
                }
            } else {
                dispatch(loginFail("Impossible de se connecter : token vide."));
                SaveUserIds("", "");
            }
        } catch (err) {
            dispatch(loginFail(err.message));
            SaveUserIds("", "");
        }
    };

    const handleToken = async () => {
        dispatch(loginUser(email, password));
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        handleToken();
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEmail(value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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
                    autoComplete="off"
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
