import React from "react";
import { render, waitFor } from "@testing-library/react";
import Offer from "./Offer";
import { IOffer } from "../sharedInterfaces/IOffer";
import { Provider } from "react-redux";
import { store } from "../app/store";

import axiosMock from "axios";
import { act } from "react-dom/test-utils";

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

    await act(async () => {
        //Impossible de faire fonctionner ce mock de useParams()
        // jest.mock("react-router-dom", () => ({
        //     ...jest.requireActual("react-router-dom"),
        //     useParams: () => ({ id: "60292e0369c3fa0015c8d795" }),
        // }));

        const { getByTestId } = render(
            <Provider store={store}>
                <Offer isTesting={true} />
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
});
