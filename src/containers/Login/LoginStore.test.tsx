import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../../App";
import axiosMock from "axios";
import { MockedLogin } from "../../sharedObjetcs/MockedLogin";

test("Redirection to home page and store after login", async () => {
    const history = createMemoryHistory();
    const renderHome = render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );

    const leftClick = { button: 0 };
    userEvent.click(screen.getByTestId("header-login-button"), leftClick);

    axiosMock.post.mockResolvedValueOnce({ data: MockedLogin });

    userEvent.click(screen.getByTestId("login-connection-button"), leftClick);

    await waitFor(() => {
        expect(screen.getByTestId("home-sell-button")).toBeInTheDocument();
    });

    const rootStore = store.getState();
    expect(rootStore.connectedUser.token).toEqual(MockedLogin.token);
    expect(rootStore.connectedUser.id).toEqual(MockedLogin._id);
    expect(rootStore.connectedUser.loginError).toEqual("");
    expect(rootStore.connectedUser.isLoading).toEqual(false);
});

// const setup = () => {
//     const history = createMemoryHistory();
//     const utils = render(
//         <Provider store={store}>
//             <Router history={history}>
//                 <App />
//             </Router>
//         </Provider>
//     );
//     expect(
//         utils.getByText(/Prêts à faire du tri dans vos placards ?/i)
//     ).toBeInTheDocument();

//     const leftClick = { button: 0 };
//     userEvent.click(screen.getByText(/Se connecter/i), leftClick);

//     // check that the content changed to the new page
//     expect(
//         screen.getByText("Pas encore de compte ? Inscris-toi !")
//     ).toBeInTheDocument();

//     expect(screen.getByText(/Email/i)).toBeInTheDocument();
//     expect(screen.getByText(/Mot de passe/i)).toBeInTheDocument();

//     const emailInput = utils.getByTestId("login-email-input");
//     //const passwordInput = utils.getByTestId("login-password-input");

//     return {
//         emailInput,
//         //passwordInput,
//         ...utils,
//     };
// };

// test("email", () => {
//     const {
//         emailInput,
//         //    , passwordInput
//     } = setup();

//     fireEvent.change(emailInput, { target: { value: "j3@s.fr" } });
//     expect(emailInput.value).toBe("j3@s.fr");

//     // fireEvent.change(passwordInput, { target: { value: "j" } });
//     // expect(passwordInput).toBe("j");
// });
