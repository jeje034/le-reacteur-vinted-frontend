import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = ({ setTokenInMemoryAndInCookie }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    const handleToken = async () => {
        let newToken = "";
        try {
            const response = await axios.post(
                "http://localhost:3000/user/login",
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
                setTokenInMemoryAndInCookie(newToken);
            }
        } catch (error) {
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
        <div>
            <div>Se connecter</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button type="submit" className="signup-button">
                    Se connecter
                </button>
            </form>
        </div>
    );
};

export default Login;
