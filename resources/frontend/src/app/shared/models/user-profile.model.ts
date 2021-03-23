export interface UserProfile {
    company_name?: UserProfileField;
    country?: UserProfileField;
    designation?: UserProfileField;
    email?: UserProfileField;
    emailable?: UserProfileField;
    first_name?: UserProfileField;
    industry?: UserProfileField;
    last_name?: UserProfileField;
    messageable?: UserProfileField;
    mobile_number?: UserProfileField;
    name?: UserProfileField;
    picture_path?: UserProfileField;
    state_region?: UserProfileField;
    status?: UserProfileField;
}

interface UserProfileField {
    value: any;
    visible: boolean;
}