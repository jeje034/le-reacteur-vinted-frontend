import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../App";

test("Home", () => {
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

    expect(
        screen.getByTestId("filter-and-sort-tool-title-search")
    ).toBeInTheDocument();
    expect(screen.getByText(/Prix entre 0 et 500 € :/i)).toBeInTheDocument();
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
    expect(screen.getByText("Se connecter")).toBeInTheDocument();
    expect(screen.getByText("Vends tes produits")).toBeInTheDocument();
    expect(screen.getByText("Commencer à vendre")).toBeInTheDocument();
});
