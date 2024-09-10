export class UserModel {
    constructor() {
        this.first_name = '';
        this.last_name = '';
        this.email = '';
        this.mobile_no = '';
        this.country_code = '+33';
        this.user_address = '';
        this._id = '';
        this.sub_domain = ''
    }

    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile_no: string;
    country_code: any;
    user_address: string;
    profile_image: any;
    sub_domain: any;
}