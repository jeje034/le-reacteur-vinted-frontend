import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import SaveUserIds from "../../functions/SaveUserIds";
import { Router, MemoryRouter, Route } from "react-router-dom";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createMemoryHistory } from "history";

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
                                    userId: "fakeUserId",
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
});
