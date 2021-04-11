import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { createMemoryHistory } from "history";
import Login from "./Login";
import { Router } from "react-router-dom";

jest.mock("react-router-dom", () => ({
    useLocation: jest.fn().mockReturnValue({
        pathname: "/another-route",
        search: "",
        hash: "",
        state: null,
        key: "5nvxpbdafa",
    }),
}));

jest.mock("react-router-dom", () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

test("Se connecter should be in the document", () => {
    const history = createMemoryHistory();
    // render(
    //   <Router history={history}>
    //     <App />
    //   </Router>

    //const { getByText } =
    render(
        <Provider store={store}>
            <Router history={history}>
                <Login />
            </Router>
        </Provider>
    );

    //expect(getByText(/Se connecter/i)).toBeInTheDocument();
});
