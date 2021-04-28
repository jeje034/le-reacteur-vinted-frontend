import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../../App";
import axiosMock from "axios";
import { MockedLogin } from "../../sharedObjetcs/MockedLogin";

test("Publish", async () => {
    const history = createMemoryHistory();

    history.push("/publish");

    render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );

    //On clique sur le bouton pour vendre les produits
    const leftClick = { button: 0 };
    userEvent.click(screen.getByTestId("home-sell-button"), leftClick);

    axiosMock.post.mockResolvedValueOnce({ data: MockedLogin });

    userEvent.click(screen.getByTestId("login-connection-button"), leftClick);

    await waitFor(() => {
        expect(screen.getByText("Décrit ton article")).toBeInTheDocument();
    });

    expect(screen.getByText("Vends ton article")).toBeInTheDocument();
    expect(
        screen.getByText("Clique ou glisse et dépose pour ajouter une photo")
    ).toBeInTheDocument();
    expect(screen.getByText("Titre")).toBeInTheDocument();
    expect(screen.getByText("Marque")).toBeInTheDocument();
    expect(screen.getByText("Couleur")).toBeInTheDocument();
    expect(screen.getByText("Etat")).toBeInTheDocument();
    expect(screen.getByText("Lieu")).toBeInTheDocument();
    expect(screen.getByText("Prix")).toBeInTheDocument();
    expect(
        screen.getByText("Je suis intéressé(e) par les échanges")
    ).toBeInTheDocument();
    expect(screen.getByText("Ajouter")).toBeInTheDocument();

    const titleInput = screen.getByTestId("publish-title") as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: "myTitle" } });
    expect(titleInput.value).toBe("myTitle");

    const brandInput = screen.getByTestId("publish-brand") as HTMLInputElement;
    fireEvent.change(brandInput, { target: { value: "myBrand" } });
    expect(brandInput.value).toBe("myBrand");

    const descriptionInput = screen.getByTestId(
        "publish-description"
    ) as HTMLInputElement;
    fireEvent.change(descriptionInput, { target: { value: "myDescription" } });
    expect(descriptionInput.value).toBe("myDescription");

    const colorInput = screen.getByTestId("publish-color") as HTMLInputElement;
    fireEvent.change(colorInput, { target: { value: "myColor" } });
    expect(colorInput.value).toBe("myColor");
});
