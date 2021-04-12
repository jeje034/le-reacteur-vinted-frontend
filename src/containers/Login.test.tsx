import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../App";

test("Login", () => {
    const history = createMemoryHistory();
    render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );

    expect(
        screen.getByText(/Prêts à faire du tri dans vos placards ?/i)
    ).toBeInTheDocument();

    const leftClick = { button: 0 };
    userEvent.click(screen.getByText(/Se connecter/i), leftClick);

    // check that the content changed to the new page
    expect(
        screen.getByText("Pas encore de compte ? Inscris-toi !")
    ).toBeInTheDocument();

    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Mot de passe/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Pas encore de compte ?/i), leftClick);

    // check that the content changed to the new page
    expect(
        screen.getByText("Tu as déjà un compte ? Connecte-toi !")
    ).toBeInTheDocument();
});
