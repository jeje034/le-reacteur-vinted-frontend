import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../../App";
import { IOffer } from "../../sharedInterfaces/IOffer";
import axiosMock from "axios";
import userEvent from "@testing-library/user-event";
import SaveUserIds from "../../functions/SaveUserIds";

test("Home avant Axios", () => {
    const history = createMemoryHistory();
    render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );

    //On vérifie qu'on a tous les éléments du Header
    expect(
        screen.getByTestId("filter-and-sort-tool-title-search")
    ).toBeInTheDocument();
    expect(screen.getByText("Prix entre 0 et 500 € :")).toBeInTheDocument();
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
    expect(screen.getByTestId("header-login-button")).toBeInTheDocument();
    expect(screen.getByText("Vends tes produits")).toBeInTheDocument();

    //On vérifie les autres élements chargés avant l'appel d'Axios
    expect(
        screen.getByText("Prêts à faire du tri dans vos placards ?")
    ).toBeInTheDocument();
    expect(screen.getByText("Commencer à vendre")).toBeInTheDocument();
});

test("Home avec navigation", async () => {
    const mockedOffer: IOffer = {
        _id: "60292e0369c3fa0015c8d79500",
        product_name: "Tongs Roxy bleues",
        product_price: 25,
        product_pictures: [],
        product_image: { secure_url: "" },
        product_details: [],
        product_description: "Tongs Roxy bleues",
        owner: { account: { avatar: { secure_url: "" }, username: "" } },
    };

    let mockedOffers: IOffer[] = [];

    for (let i = 0; i < 11; i++) {
        mockedOffer._id = mockedOffer._id.substring(0, 24) + i;

        mockedOffer.product_price = 25 + i; //Ainsi,
        //on aura un seul 25 € dans le document et expect(screen.getByText("25 €")).toBeInTheDocument(); fonctionnera

        mockedOffers.push({ ...mockedOffer });
    }

    axiosMock.get.mockResolvedValueOnce({ data: { offers: mockedOffers } });

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
        expect(screen.getByText("25 €")).toBeInTheDocument();
    });

    const leftClick = { button: 0 };
    userEvent.click(
        screen.getByTestId("navigation-bar-next-page-button"),
        leftClick
    );
    expect(screen.getByText("35 €")).toBeInTheDocument();

    userEvent.click(
        screen.getByTestId("navigation-bar-previous-page-button"),
        leftClick
    );
    expect(screen.getByText("25 €")).toBeInTheDocument();

    userEvent.click(
        screen.getByTestId("navigation-bar-previous-page-button"),
        leftClick
    );
    expect(screen.getByText("25 €")).toBeInTheDocument();
});

test("Home avec utilisateur déjà connecté", () => {
    SaveUserIds({ userToken: "fakeUserToken", userId: "fakeUserId" });
    const history = createMemoryHistory();
    render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );

    //La présence de ce bouton indique qu'on est connecté
    expect(screen.getByTestId("header-log-out-button")).toBeInTheDocument();
});
