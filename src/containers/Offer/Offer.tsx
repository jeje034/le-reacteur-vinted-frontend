import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { IOffer } from "../../sharedInterfaces/IOffer";
import * as Constants from "../../constants/constants";

const Offer = ({ isTesting }: { isTesting?: boolean }) => {
    const defaultOffer: IOffer = {
        _id: "",
        product_name: "",
        product_price: 0,
        product_pictures: [],
        product_image: { secure_url: "" },
        product_details: [],
        product_description: "",
        owner: { account: { avatar: { secure_url: "" }, username: "" } },
    };

    const [isDownloading, setIsDownloading] = useState(true);
    const { id }: { id: string } = useParams();
    const [offer, setOffer] = useState<IOffer>(defaultOffer);

    let history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    Constants.BASE_URL + "/offer/" + id
                );

                //if (response) ajouté pour les tests
                if (response) {
                    setOffer(response.data);
                    setIsDownloading(false);
                }
            } catch (error) {
                console.log("An error occured:", error.message);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="offer-main" data-testid="offer-debug-id">
            {isDownloading ? (
                <div
                    className="offer-main-when-downloading"
                    data-testid="offer-is-downloading"
                >
                    <div>Chargement en cours ...</div>
                </div>
            ) : (
                <div
                    className="offer-main-when-downloaded"
                    data-testid="offer-is-downloaded"
                >
                    {offer.product_pictures &&
                    offer.product_pictures.length > 0 &&
                    offer.product_pictures[0] &&
                    offer.product_pictures[0].secure_url ? (
                        <img
                            className="offer-big-picture"
                            src={offer.product_pictures[0].secure_url}
                            alt={offer.product_name}
                        />
                    ) : offer.product_image &&
                      offer.product_image.secure_url ? (
                        <img
                            className="offer-big-picture"
                            src={offer.product_image.secure_url}
                            alt={offer.product_name}
                        />
                    ) : (
                        <div>Sans image</div>
                    )}

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
                            <div
                                className="offer-title"
                                data-testid="offer-product-name"
                            >
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
                        <button
                            className="offer-buy"
                            data-testid="offer-buy"
                            onClick={() => {
                                history.push("/payment", {
                                    price: offer.product_price,
                                    productName:
                                        offer.product_name || "(Sans nom)",
                                });
                            }}
                        >
                            Acheter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Offer;
