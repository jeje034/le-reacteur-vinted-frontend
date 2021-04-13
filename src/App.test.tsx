import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("App", () => {
    const { getByText } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    //On vérifie qu'on arrive bien sur l'écran d'accueil
    expect(screen.getByTestId("button-text-to-sell")).toBeInTheDocument();
});
