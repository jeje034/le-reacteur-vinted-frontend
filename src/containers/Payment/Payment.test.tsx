import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { Router, MemoryRouter, Route } from "react-router-dom";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import axiosMock from "axios";
import * as Constants from "../../constants/constants";

const stripePromise = loadStripe(
    //Clé plublique
    "fakeKeyForJestTests"
);

test("Payment", async () => {
    const history = createMemoryHistory();
    const fakePrice: number = 30;
    const { getByTestId } = render(
        <Provider store={store}>
            <Router history={history}>
                <MemoryRouter
                    initialEntries={[
                        {
                            state: {
                                price: fakePrice,
                                productName: "Tongs01",
                                userIds: {
                                    userToken: "fakeUserToken",
                                    userId:
                                        Constants.FAKE_USER_ID_FOR_STRIPE_IN_JEST,
                                },
                            },
                        },
                    ]}
                >
                    <Route>
                        <Elements stripe={stripePromise}>
                            <Payment />
                        </Elements>
                    </Route>
                </MemoryRouter>
            </Router>
        </Provider>
    );
    expect(getByTestId("payment-main")).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText("Résumé de la commande")).toBeInTheDocument();
    });
    expect(screen.getByText(fakePrice.toFixed(2) + " €")).toBeInTheDocument();
    expect(screen.getByTestId("payment-button-pay")).toBeInTheDocument();

    // jest.spyOn(window, "alert").mockImplementation((alertMessage) => {
    //     console.log(`alert: ${alertMessage}`);
    // });

    const leftClick = { button: 0 };
    userEvent.click(screen.getByTestId("payment-button-pay"), leftClick);

    const mockedResponse = {
        status: "succeeded",
    };
    axiosMock.post.mockResolvedValueOnce({ data: mockedResponse });
    await waitFor(() => {
        expect(
            screen.getByText("Paiement effectué. Merci pour votre achat.")
        ).toBeInTheDocument();
    });
});
