import { ImageModel } from "..";

export class OffersModel {
    _id: string;
    name: string;
    banner_image: string | ArrayBuffer;
    offer_category_id: string = '';
    offer_button_link: string;
    discount: number = 0;
    price: number;
    status: string = '';
    description: string;
    offer_category_name: string;
    image: ImageModel[];
    image_url: string = '';
}