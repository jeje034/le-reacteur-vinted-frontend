import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../../App";
import axiosMock from "axios";
import { MockedLogin } from "../../sharedObjetcs/MockedLogin";

test("Redirection to home page and store after signup", async () => {
    const history = createMemoryHistory();
    const renderHome = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );

    const mockedSignup = { ...MockedLogin, username: "jeje" };

    const leftClick = { button: 0 };
    userEvent.click(screen.getByTestId("header-signup-button"), leftClick);

    axiosMock.post.mockResolvedValueOnce({ data: mockedSignup });

    userEvent.click(screen.getByTestId("signup-signup-button"), leftClick);

    await waitFor(() => {
        expect(screen.getByTestId("home-sell-button")).toBeInTheDocument();
    });

    const rootStore = store.getState();
    expect(rootStore.connectedUser.token).toEqual(mockedSignup.token);
    expect(rootStore.connectedUser.id).toEqual(mockedSignup._id);
    expect(rootStore.connectedUser.loginError).toEqual("");
    expect(rootStore.connectedUser.isLoading).toEqual(false);
});
