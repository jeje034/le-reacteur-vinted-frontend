import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Offer = ({ baseUrl }: { baseUrl: string }) => {
    interface IProductPicture {
        secure_url: string;
    }
    interface IProductImage {
        secure_url: string;
    }

    interface IOffer {
        product_pictures: IProductPicture[];
        product_name: string;
        product_image: IProductImage;
        product_price: number;
        product_details: IProductDetails[];
        product_description: string;
        owner: {
            account: { avatar: { secure_url: string }; username: string };
        };
    }

    interface IProductDetails {
        [name: string]: string;
    }

    const defaultOffer: IOffer = {
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
                const response = await axios.get(baseUrl + "/offer/" + id);
                setOffer(response.data);
                setIsDownloading(false);
            } catch (error) {
                console.log("An error occured:", error.message);
            }
        };

        fetchData();
    }, [id, baseUrl]);

    return (
        <div className="offer-main">
            {isDownloading ? (
                <div className="offer-main-when-downloading">
                    <div>Chargement en cours ...</div>
                </div>
            ) : (
                <div className="offer-main-when-downloaded">
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
                        <button
                            className="offer-buy"
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
