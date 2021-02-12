import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
    const [isDownloading, setIsDownloading] = useState(true);
    const { id } = useParams();
    const [offer, setOffer] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    //"https://le-reacteur-vinted.herokuapp.com/offer" + id
                    "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
                );
                setOffer(response.data);
                setIsDownloading(false);
            } catch (error) {
                console.log("An error occured:", error.message);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="offer-main">
            {isDownloading ? (
                <div className="offer-main-when-downloading">
                    <div>Chargement en cours ...</div>
                </div>
            ) : (
                <div className="offer-main-when-downloaded">
                    {/* {offer.product_pictures.map((elem, index) => {
                            return (
                                <div key={index}>
                                    <img
                                        src={elem.secure_url}
                                        alt={elem.product_name}
                                    />
                                </div>
                            );
                        })} */}
                    <img
                        className="offer-big-picture"
                        src={offer.product_pictures[0].secure_url}
                        alt={offer.product_pictures[0].product_name}
                    />

                    <div className="offer-big-text-zone">
                        <div className="offer-top-description">
                            <div className="offer-price">
                                {offer.product_price.toFixed(2) + " €"}
                            </div>
                            <div className="offer-product-details">
                                {offer.product_details.map(
                                    (productDetail, index) => {
                                        return (
                                            <div
                                                className="offer-product-detail"
                                                key={index}
                                            >
                                                <div className="offer-product-detail-key">
                                                    {
                                                        Object.keys(
                                                            productDetail
                                                        )[0]
                                                    }
                                                </div>
                                                <div className="offer-product-detail-value">
                                                    {
                                                        Object.values(
                                                            productDetail
                                                        )[0]
                                                    }
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                        <div className="offer-delimiter"></div>
                        <div className="offer-bottom-description">
                            <div className="offer-title">
                                {offer.product_name}
                            </div>
                            <div className="offer-description">
                                {offer.product_description}
                            </div>
                            <div className="offer-owner-image-and-surname">
                                {offer.owner &&
                                    offer.owner.account &&
                                    offer.owner.account.avatar &&
                                    offer.owner.account.avatar.secure_url && (
                                        <img
                                            className="offer-avatar-image"
                                            src={
                                                offer.owner.account.avatar
                                                    .secure_url
                                            }
                                            alt="Owner"
                                        />
                                    )}

                                <div>
                                    {offer.owner &&
                                        offer.owner.account &&
                                        offer.owner.account.username}
                                </div>
                            </div>
                        </div>
                        <button className="offer-buy">Acheter</button>
                    </div>

                    {/* <Link to="/">Home</Link> */}
                </div>
            )}
        </div>
    );
};

export default Offer;
