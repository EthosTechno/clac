
export class IndivisualSubModel {
    _id: string;
    subscription_id: string = '';
    amount: number;
    description: string;
    fr_description: string;
    image: string | ArrayBuffer;
    subscription_fr_title: string;
    subscription_fr_sub_title: string;
    subscription_sub_title: string;
    subscription_title: any;
    tax: number;
    type: string;
    title: string;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    mobile_no: string;
    password: string;
    birthdate: Date;
    register_date: Date;
    subscription_start_date: Date;
    subscription_end_date: Date;
    subscription_plan_id: string;
    conform_password: string;
    reference_source: string;
    country_code:string;
    stripe_transcription:string
}