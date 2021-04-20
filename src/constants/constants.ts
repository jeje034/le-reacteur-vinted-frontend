//Fichier de constantes pour limiter les "magic numbers".
//Si l'application était plus grosse, il y  aurait eu plusieurs fichiers de constantes.
//
export const MIN_PRICE_IN_FILTER: number = 0;
export const MAX_PRICE_IN_FILTER: number = 500;

export const BASE_URL: string = "https://le-reacteur-vinted.herokuapp.com"; //Site distant Jérôme
//export const BASE_URL : string = "https://lereacteur-vinted-api.herokuapp.com";   //Site distant Le Reacteur
//export const BASE_URL: string = "http://localhost:3001";                          //Site local Jérôme

export const FAKE_USER_ID_FOR_STRIPE_IN_JEST: string =
    "FakeUserIdForStripeInJest";
