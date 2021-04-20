import { SyntheticEvent, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import SaveUserIds from "../../functions/SaveUserIds";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { tryToLog } from "../../app/connectedUserSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginError } = useAppSelector(
        (state: RootState) => state.connectedUser
    );

    const dispatch = useAppDispatch();

    let history = useHistory();
    let location = useLocation();

    const loginUser = async (email: string, password: string) => {
        const resultAction = await dispatch(
            tryToLog({ email: email, password: password })
        );

        if (resultAction?.payload?.token) {
            SaveUserIds({
                userToken: resultAction?.payload?.token,
                userId: resultAction?.payload?._id,
            });

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
            SaveUserIds({ userToken: "", userId: "" });
        }
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        loginUser(email, password);
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
                    data-testid="login-email-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={handlePasswordChange}
                    className="signup-login-input"
                    autoComplete="off"
                    data-testid="login-password-input"
                />
                <div
                    className={
                        loginError
                            ? "signup-login-error-message"
                            : "signup-login-error-message visibility-hidden"
                    }
                >
                    {loginError}
                </div>
                <button
                    type="submit"
                    className="signup-login-button"
                    data-testid="login-connection-button"
                >
                    Se connecter
                </button>
            </form>
            {
                <Link
                    to="/signup"
                    className="signup-login-switch"
                    data-testid="login-switch-to-signup"
                >
                    <div>Pas encore de compte ? Inscris-toi !</div>
                </Link>
            }
        </div>
    );
};

export default Login;
