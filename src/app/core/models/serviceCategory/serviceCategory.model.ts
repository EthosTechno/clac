import { ImageModel } from "..";

export class ServiceCatModel {
    _id: string;
    name: string;
    image: string | ArrayBuffer;
    offer_category_id: string = '';
    offer_button_link: string;
    discount: number = 0;
    status: string = '';
    offer_category_name: string;
    image_url: string = '';
    service: any;
    category_name: string = '';
    service_name: string = '';
    service_category_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    promo_code: string;
    price: number;
    pick_up_address: string;
    pick_up_time: string;
    delivery_address: string;
    delivery_time: string;
    description: string;
    item_number: string;
}