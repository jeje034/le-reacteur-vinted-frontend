import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../../App";

test("Login page screen content and link to Signup page", () => {
    const history = createMemoryHistory();

    //On charge la page Home
    render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );

    //On clique sur le bouton "Se connecter"
    const leftClick = { button: 0 };
    userEvent.click(screen.getByTestId("header-login-button"), leftClick);

    //On vérifie le texte à l'écran et les input
    expect(
        screen.getByText("Pas encore de compte ? Inscris-toi !")
    ).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Mot de passe/i)).toBeInTheDocument();
    const emailInput = screen.getByTestId(
        "login-email-input"
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
        "login-password-input"
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "j3@s.fr" } });
    expect(emailInput.value).toBe("j3@s.fr");
    fireEvent.change(passwordInput, { target: { value: "j" } });
    expect(passwordInput.value).toBe("j");

    userEvent.click(screen.getByTestId("login-switch-to-signup"), leftClick);

    // On vérifie qu'on arrive sur la nouvelle page
    expect(screen.getByTestId("signup-switch-to-login")).toBeInTheDocument();
});
