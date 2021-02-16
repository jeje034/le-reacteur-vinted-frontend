import { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import axios from "axios";

const Payment = ({ baseUrl, token }) => {
    const location = useLocation();

    //msgjs21: tester identification

    const { price, productName } = location.state;

    const stripe = useStripe();
    const elements = useElements();
    const [isCompleted, setIsCompleted] = useState(false);

    const amount = price + 0.4 + 0.8;

    const handleSubmit = async (event) => {
        event.preventDefault();

        // On récupère ici les données bancaires que l'utilisateur rentre
        const cardElement = elements.getElement(CardElement);

        // Demande de création d'un token via l'API Stripe. On envoie les données bancaires dans la requête
        const stripeResponse = await stripe.createToken(cardElement, {
            name: Cookies.get("userId"),
        });

        if (stripeResponse.error) {
            alert(
                "Informations bancaires non valides : " +
                    (stripeResponse.error.message
                        ? stripeResponse.error.message
                        : stripeResponse.error.code)
            );
        } else {
            const stripeToken = stripeResponse.token.id;

            // Envoi vers le backend Vinted du token reçu depuis l'API Stripe
            const response = await axios.post(baseUrl + "/payment", {
                stripeToken: stripeToken,
                productName: productName,
                amount: amount, //Si la transaction s'est bien passée, elle sera visible en https://dashboard.stripe.com/test/events
                //   msgjs21 si temps passer l'id du produit au lieu de amount (par sécurité)
            });

            //console.log(response.data);

            // Si la réponse du serveur est favorable, la transaction a eu lieu
            if (response.data.status === "succeeded") {
                setIsCompleted(true);
            }
        }
    };

    return (
        <div className="payment-main">
            {token ? (
                <div className="container ">
                    <h1>Résumé de la commande</h1>
                    <div>Commande</div>
                    <div>{price.toFixed(2) + " €"}</div>
                    <div>Frais protection acheteurs</div>
                    <div>0.40 €</div>
                    <div>Frais de port</div>
                    <div>0.80 €</div>
                    <div>Total</div>
                    <div>{amount.toFixed(2) + " €"}</div>
                    {isCompleted ? (
                        <div>Paiement effectué. Merci pour votre achat.</div>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    Il ne vous reste plus qu'une étape pour vous
                                    offrir <strong>{productName}</strong>. Vous
                                    allez payer{" "}
                                    <strong>{amount.toFixed(2) + " €"}</strong>{" "}
                                    (frais de protection et frais de port
                                    inclus).
                                </div>
                                <CardElement />
                                <button type="submit">Payer</button>
                            </form>
                        </>
                    )}
                </div>
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { fromPayment: true } }}
                />
            )}
        </div>
    );
};
//msgjs21 strong HS
export default Payment;
