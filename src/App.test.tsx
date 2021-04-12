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

    //OK même si texte partiel, même si casse KO (grâce au i final)
    expect(
        getByText(/Prêts à faire du tri dans vos placards ?/i)
    ).toBeInTheDocument();

    // //Ko si casse KO, si texte partiel. Par exemple ("tri") est KO
    // expect(
    //     getByText("Prêts à faire du tri dans vos placards ?")
    // ).toBeInTheDocument();
});
