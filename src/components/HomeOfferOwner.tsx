import { IOffer } from "../containers/Offer";
import AvatarFemme from "../assets/images/avatarFemme.jpg";

const HomeOfferOwner = ({ offer }: { offer: IOffer }) => {
    return (
        <div className="home-offer-owner-main">
            <img
                className="home-offer-owner-photo"
                src={
                    offer.owner.account.avatar
                        ? offer.owner.account.avatar.secure_url
                        : AvatarFemme
                }
                alt={offer.product_name}
            />
            <div className="home-offer-owner-unsername">
                {offer.owner.account.username}
            </div>
        </div>
    );
};

export default HomeOfferOwner;
