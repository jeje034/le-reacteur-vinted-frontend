import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TopBigImage from "../assets/hero.09bfd0f9.jpg";

const Home = ({ titleSearch, priceRange }) => {
    const [isDownloading, setIsDownloading] = useState(true);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            //"https://le-reacteur-vinted.herokuapp.com/offers"
            let request = "https://lereacteur-vinted-api.herokuapp.com/offers";

            request += `?priceMin=${priceRange[0]}&priceMax=${priceRange[1]}`;

            if (titleSearch) {
                request += `&title=${titleSearch}`;
            }

            try {
                const response = await axios.get(request);
                setOffers(response.data.offers);
                setIsDownloading(false);
            } catch (error) {
                console.log("An error occured :", error.message);
            }
        };
        fetchData();
    }, [titleSearch, priceRange]);

    const getPoductDetail = (productDetails, productDetailId) => {
        if (
            !productDetailId ||
            !productDetails ||
            productDetails.length === 0
        ) {
            return "";
        }

        for (let i = 0; i < productDetails.length; i++) {
            if (productDetails[i][productDetailId]) {
                return productDetails[i][productDetailId];
            }
        }
        return "";
    };

    return (
        <div>
            <div>
                <img
                    src={TopBigImage}
                    alt="Des personnes et des vêtements"
                    className="home-top-big-image"
                />

                <div className="home-div-dans-image">
                    <div className="home-text-to-sell">
                        Prêts à faire du tri dans vos placards ?
                    </div>
                    <button className="button-text-to-sell">
                        Commencer à vendre
                    </button>
                </div>
            </div>

            {isDownloading ? (
                <div className="home-before-cards container">
                    Chargement en cours...
                </div>
            ) : (
                <div className="home-before-cards container">
                    {offers.map((offer, index) => {
                        return (
                            <Link key={offer._id} to={`/offer/${offer._id}`}>
                                <div className="home-card">
                                    <div className="home-offer-owner">
                                        <img
                                            className="home-offer-owner-photo"
                                            src={
                                                offer.owner.account.avatar
                                                    .secure_url
                                            }
                                            alt={offer.product_name}
                                        />
                                        <div className="home-offer-owner-unsername">
                                            {offer.owner.account.username}
                                        </div>
                                    </div>
                                    <img
                                        className="home-card-photo"
                                        src={offer.product_image.secure_url}
                                        alt={offer.product_name}
                                    />
                                    <div className="home-price">
                                        {"" + offer.product_price + " €"}
                                    </div>
                                    <div className="home-taille-marque">
                                        {getPoductDetail(
                                            offer.product_details,
                                            "TAILLE"
                                        )}
                                    </div>
                                    <div className="home-taille-marque">
                                        {getPoductDetail(
                                            offer.product_details,
                                            "MARQUE"
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Home;
