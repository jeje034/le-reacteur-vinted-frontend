import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";
import * as Constants from "./constants/constants";

import { useAppSelector, useAppDispatch } from "./app/hooks";
import { RootState } from "./app/store";
import { initToken } from "./app/connectedUserSlice";

const stripePromise = loadStripe(
    //Clé plublique
    "pk_test_51ILTyoFNedoBHlEJ39mM23X3wmMbSH8mBS43llwX3Wn1UARP03f6II0Z5pF6nGUzxcppHT1YKYWgwSgyol3LFmJv00T3uTYOl6"
);

function App() {
    const [titleSearch, setTitleSearch] = useState("");
    const [priceRange, setPriceRange] = useState([
        Constants.MIN_PRICE_IN_FILTER,
        Constants.MAX_PRICE_IN_FILTER,
    ]);

    const { token } = useAppSelector((state: RootState) => state.connectedUser);

    const dispatch = useAppDispatch();

    useEffect(() => {
        let token = Cookies.get("token");
        dispatch(initToken(token));
    }, [dispatch]);

    const baseUrl = "https://le-reacteur-vinted.herokuapp.com"; //Site distant Jérôme
    //const baseUrl = "https://lereacteur-vinted-api.herokuapp.com"; //Site distant Le Reacteur
    //const baseUrl = "http://localhost:3001"; //Site local Jérôme

    return (
        <Router>
            <Header
                titleSearch={titleSearch}
                setTitleSearch={setTitleSearch}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
            />
            <Switch>
                <Route path="/offer/:id">
                    <Offer baseUrl={baseUrl} />
                </Route>
                <Route path="/signup">
                    <Signup baseUrl={baseUrl} />
                </Route>
                <Route path="/login">
                    <Login baseUrl={baseUrl} />
                </Route>
                <Route path="/publish">
                    <Publish baseUrl={baseUrl} token={token} />
                </Route>
                <Route path="/payment">
                    <Elements stripe={stripePromise}>
                        <Payment baseUrl={baseUrl} token={token} />
                    </Elements>
                </Route>
                <Route path="/">
                    <Home
                        titleSearch={titleSearch}
                        priceRange={priceRange}
                        baseUrl={baseUrl}
                    />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
