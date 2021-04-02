import "./App.css";
import { useState } from "react";
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

const stripePromise = loadStripe(
    //Clé plublique
    "pk_test_51ILTyoFNedoBHlEJ39mM23X3wmMbSH8mBS43llwX3Wn1UARP03f6II0Z5pF6nGUzxcppHT1YKYWgwSgyol3LFmJv00T3uTYOl6"
);

function App() {
    const [token, setToken] = useState(Cookies.get("token") || null);
    const [titleSearch, setTitleSearch] = useState("");
    const [priceRange, setPriceRange] = useState([0, 500]); //msgjs21 voir pour constantes en fonction de la réponse sur la route "/"
    const baseUrl = "https://le-reacteur-vinted.herokuapp.com"; //Site distant Jérôme
    //const baseUrl = "https://lereacteur-vinted-api.herokuapp.com"; //Site distant Le Reacteur
    //const baseUrl = "http://localhost:3001"; //Site local Jérôme

    const setuserInformationsInMemoryAndInCookie = (
        userToken: string,
        userId: string
    ) => {
        setToken(userToken);
        if (userToken) {
            Cookies.set("token", userToken, { expires: 7 });
            Cookies.set("userId", userId, { expires: 7 });
        } else {
            Cookies.remove("token");
            Cookies.remove("userId");
        }
    };

    return (
        <Router>
            <Header
                token={token}
                setuserInformationsInMemoryAndInCookie={
                    setuserInformationsInMemoryAndInCookie
                }
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
                    <Signup
                        setuserInformationsInMemoryAndInCookie={
                            setuserInformationsInMemoryAndInCookie
                        }
                        baseUrl={baseUrl}
                    />
                </Route>
                <Route path="/login">
                    <Login
                        setuserInformationsInMemoryAndInCookie={
                            setuserInformationsInMemoryAndInCookie
                        }
                        baseUrl={baseUrl}
                    />
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
