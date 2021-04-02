import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TopBigImage from "../assets/hero.09bfd0f9.jpg";
import NavigationBar from "../components/NavigationBar";

const Home = ({
    titleSearch,
    priceRange,
    baseUrl,
}: {
    titleSearch: string;
    priceRange: number[];
    baseUrl: string;
}) => {
    const [isDownloading, setIsDownloading] = useState(true);
    const [offers, setOffers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [numberOfOffers, setNumberOfOffers] = useState(0);

    const limit = 10;
    let history = useHistory();

    const handleSellButtonClick = () => {
        history.push("/Publish");
    };

    useEffect(() => {
        const fetchData = async () => {
            let request = baseUrl + "/offers";

            request += `?priceMin=${priceRange[0]}&priceMax=${priceRange[1]}&page=${page}&limit=${limit}`;

            if (titleSearch) {
                request += `&title=${titleSearch}`;
            }

            try {
                const response = await axios.get(request);
                setOffers(response.data.offers);
                setNumberOfOffers(response.data.count);

                setIsDownloading(false);
            } catch (error) {
                console.log("An error occured :", error.message);
            }
        };
        fetchData();
    }, [titleSearch, priceRange, baseUrl, page]);

    //msgjs21
    const getPoductDetail = (productDetails: any, productDetailId: string) => {
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
                    <button
                        className="button-text-to-sell"
                        onClick={() => {
                            handleSellButtonClick();
                        }}
                    >
                        Commencer à vendre
                    </button>
                </div>
            </div>

            {isDownloading ? (
                <div className="home-before-cards container">
                    Chargement en cours...
                </div>
            ) : (
                <>
                    <div className="home-before-cards container">
                        {offers.map((offer, index) => {
                            return (
                                <Link
                                    key={offer._id}
                                    to={`/offer/${offer._id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    <div
                                        className={
                                            (index + 1) % 5 === 0
                                                ? "home-card home-card-no-margin-right"
                                                : "home-card"
                                        }
                                    >
                                        <div className="home-offer-owner">
                                            {offer.owner.account.avatar && (
                                                <img
                                                    className="home-offer-owner-photo"
                                                    src={
                                                        offer.owner.account
                                                            .avatar.secure_url
                                                    }
                                                    alt={offer.product_name}
                                                />
                                            )}
                                            <div className="home-offer-owner-unsername">
                                                {offer.owner.account.username}
                                            </div>
                                        </div>
                                        {offer.product_image ? (
                                            <img
                                                className="home-card-photo"
                                                src={
                                                    offer.product_image
                                                        .secure_url
                                                }
                                                alt={offer.product_name}
                                            />
                                        ) : (
                                            <div>Sans image</div>
                                        )}

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

                    <NavigationBar
                        page={page}
                        setPage={setPage}
                        limit={limit}
                        numberOfOffers={numberOfOffers}
                    ></NavigationBar>
                </>
            )}
        </div>
    );
};

export default Home;