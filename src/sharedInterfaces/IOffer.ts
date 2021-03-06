//C'est ainsi que l'api Vinted renvoie ces "offers".
//Il n'y a pas obligatoirement toutes les propriétés renvoyées par l'API.

export interface IProductDetail {
    [name: string]: string;
}
export interface IProductPicture {
    secure_url: string;
}
export interface IProductImage {
    secure_url: string;
}

export interface IOffer {
    _id: string;
    product_pictures: IProductPicture[];
    product_name: string;
    product_image: IProductImage;
    product_price: number;
    product_details: IProductDetail[];
    product_description: string;
    owner: {
        account: { avatar: { secure_url: string }; username: string };
    };
}
