interface AboutUser {
    dob: String;
    emailId: String;
    firstname: String;
    lastname: String;
    gender: String;
}

export class User {
    _id: String = '';
    username: String = '';
    about: AboutUser = {
        dob: '',
        emailId: '',
        firstname: '',
        lastname: '',
        gender: ''
    };
    activity: any = [];
    followers: any = [];
    following: any = [];
    posts: any = [];
    groups: any = [];
    hash: String = '';
    salt: String = '';
}