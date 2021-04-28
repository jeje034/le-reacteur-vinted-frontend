import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../../App";

test("Signup page screen content and link to Login page", () => {
    const history = createMemoryHistory();

    //On charge la page Home
    render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );

    //On clique sur le bouton "S'inscrire'"
    const leftClick = { button: 0 };
    userEvent.click(screen.getByTestId("header-signup-button"), leftClick);

    //On vérifie le texte à l'écran et les input
    expect(
        screen.getByText("Tu as déjà un compte ? Connecte-toi !")
    ).toBeInTheDocument();
    // expect(screen.getByText(/Nom d'utilisateur/i)).toBeInTheDocument();
    //expect(screen.getByText("Email")).toBeInTheDocument();
    //expect(screen.getByText("Mot de passe")).toBeInTheDocument();
    expect(
        screen.getByText("S'inscrire à notre newsletter")
    ).toBeInTheDocument();
    expect(
        screen.getByText(
            "En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de Confidentialité de Vinted. Je confirme avoir au moins 18 ans."
        )
    ).toBeInTheDocument();
    expect(screen.getByTestId("signup-signup-button")).toBeInTheDocument();
    const usernameInput = screen.getByTestId(
        "signup-username-input"
    ) as HTMLInputElement;
    const emailInput = screen.getByTestId(
        "signup-email-input"
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
        "signup-password-input"
    ) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: "jeje" } });
    expect(usernameInput.value).toBe("jeje");
    fireEvent.change(emailInput, { target: { value: "j3@s.fr" } });
    expect(emailInput.value).toBe("j3@s.fr");
    fireEvent.change(passwordInput, { target: { value: "j" } });
    expect(passwordInput.value).toBe("j");

    userEvent.click(screen.getByTestId("signup-switch-to-login"), leftClick);

    // On vérifie qu'on arrive sur la nouvelle page
    expect(screen.getByTestId("login-switch-to-signup")).toBeInTheDocument();
});
