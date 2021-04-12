import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../App";
import { IOffer } from "../sharedInterfaces/IOffer";
import axiosMock from "axios";

test("Home avant Axios", () => {
    const history = createMemoryHistory();
    render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );

    //On vérifie qu'on est sur la bonne page
    expect(
        screen.getByText(/Prêts à faire du tri dans vos placards ?/i)
    ).toBeInTheDocument();

    //On vérifie qu'on a tous les éléments du Header
    expect(
        screen.getByTestId("filter-and-sort-tool-title-search")
    ).toBeInTheDocument();
    expect(screen.getByText("Prix entre 0 et 500 € :")).toBeInTheDocument();
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
    expect(screen.getByText("Se connecter")).toBeInTheDocument();
    expect(screen.getByText("Vends tes produits")).toBeInTheDocument();

    //On vérifie les autres élements chargés avant l'appel d'Axios
    expect(screen.getByText("Commencer à vendre")).toBeInTheDocument();
});

test("Home Axios", async () => {
    const mockedOffer: IOffer = {
        _id: "60292e0369c3fa0015c8d795",
        product_name: "Tongs Roxy bleues",
        product_price: 5,
        product_pictures: [],
        product_image: { secure_url: "" },
        product_details: [],
        product_description: "Tongs Roxy bleues",
        owner: { account: { avatar: { secure_url: "" }, username: "" } },
    };

    let mockedOffers: IOffer[] = [];

    mockedOffers.push(mockedOffer);

    axiosMock.get.mockResolvedValueOnce({ data: { offers: mockedOffers } });

    //await act(async () => {
    const history = createMemoryHistory();
    render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );

    //On vérifie tout de même qu'on est sur la bonne page
    expect(
        screen.getByText(/Prêts à faire du tri dans vos placards ?/i)
    ).toBeInTheDocument();

    //On vérifie le messages d'attente
    expect(screen.getByText("Chargement en cours...")).toBeInTheDocument();

    //On attend la simulation de retour d'Axios
    await waitFor(() => {
        expect(screen.getByTestId("home-price")).toBeInTheDocument();
    });

    //On teste la présence à l'écran des valeurs issues de la simulation du get Axios
    expect(screen.getByText("5 €")).toBeInTheDocument();
});
