import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../../App";
import axiosMock from "axios";

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
    userEvent.click(screen.getByText(/Se connecter/i), leftClick);

    //On vérifie le text à l'écran et les input
    expect(
        screen.getByText("Pas encore de compte ? Inscris-toi !")
    ).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Mot de passe/i)).toBeInTheDocument();
    const emailInput = screen.getByTestId("login-email-input");
    const passwordInput = screen.getByTestId("login-password-input");

    fireEvent.change(emailInput, { target: { value: "j3@s.fr" } });
    expect(emailInput.value).toBe("j3@s.fr");
    fireEvent.change(passwordInput, { target: { value: "j" } });
    expect(passwordInput.value).toBe("j");

    userEvent.click(screen.getByText(/Pas encore de compte ?/i), leftClick);

    // check that the content changed to the new page
    expect(
        screen.getByText("Tu as déjà un compte ? Connecte-toi !")
    ).toBeInTheDocument();
});
