import { render, waitFor } from "@testing-library/react";
import Offer from "./Offer";
import { IOffer } from "../../sharedInterfaces/IOffer";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter as Router, MemoryRouter, Route } from "react-router-dom";
import axiosMock from "axios";

test("Product details mockes", async () => {
    const mockedOffer: IOffer = {
        _id: "60292e0369c3fa0015c8d795",
        product_name: "Tongs Roxy bleues",
        product_price: 0,
        product_pictures: [],
        product_image: { secure_url: "" },
        product_details: [],
        product_description: "Tongs Roxy bleues",
        owner: { account: { avatar: { secure_url: "" }, username: "" } },
    };
    axiosMock.get.mockResolvedValueOnce({ data: mockedOffer });

    const { getByTestId } = render(
        <Provider store={store}>
            <Router>
                <MemoryRouter initialEntries={[`/offer/${mockedOffer._id}`]}>
                    <Route path="/offer/:productId">
                        <Offer />
                    </Route>
                </MemoryRouter>
            </Router>
        </Provider>
    );
    expect(getByTestId("offer-debug-id")).toBeInTheDocument();

    expect(getByTestId("offer-is-downloading")).toHaveTextContent(
        "Chargement en cours ..."
    );

    await waitFor(() => {
        expect(getByTestId("offer-is-downloaded")).toBeInTheDocument();
    });

    expect(getByTestId("offer-product-name")).toHaveTextContent(
        "Tongs Roxy bleues"
    );
});
