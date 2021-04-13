import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import Header from "./components/Header";
import Signup from "./containers/SignUp/Signup";
import Login from "./containers/Login/Login";
import Publish from "./containers/Publish/Publish";
import Payment from "./containers/Payment/Payment";

import { useAppDispatch } from "./app/hooks";
import { initToken } from "./app/connectedUserSlice";

const stripePromise = loadStripe(
    //Clé plublique
    "pk_test_51ILTyoFNedoBHlEJ39mM23X3wmMbSH8mBS43llwX3Wn1UARP03f6II0Z5pF6nGUzxcppHT1YKYWgwSgyol3LFmJv00T3uTYOl6"
);

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        let token = Cookies.get("token");
        dispatch(initToken(token));
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/offer/:id">
                    <Offer />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/publish">
                    <Publish />
                </Route>
                <Route path="/payment">
                    <Elements stripe={stripePromise}>
                        <Payment />
                    </Elements>
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
