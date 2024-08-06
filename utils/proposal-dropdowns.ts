export const religionList = [
    { label: 'Islam', value: "islam" },
    { label: 'Hinduism', value: "hinduism" },
    { label: 'Buddhism', value: "buddhism" },
    { label: 'Christianity', value: "christianity" },
    { label: 'Others', value: "others" },
];

export const MaritalStatusList = [
    { label: "Married", value: "married" },
    { label: "Unmarried", value: "unmarried" },
    { label: "Widower", value: "widower" },
    { label: "Widow", value: "widow" },
    { label: "Divorced", value: "divorced" },
    { label: "Separated", value: "separated" },
];

export const GenderList = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
];

export const identityTypeList = [
    { label: "NID", value: "nid" },
    { label: "Birth Certificate", value: "brc" },
    { label: "Passport", value: "passport" },
];

export const getIdentityLabel = (value: string) => {
    const identity = identityTypeList.find((i) => i.value === value);
    return identity ? identity.label : "NID";
}

export const getIdentityValidationMessageList = {
    nid: 'NID minimum length must be 17/13 digits or 10 digit for smart card',
    passport: 'Both Alphanumeric code will require',
    brc: 'Birth certificate minimum length must be 17 digits',
}

export const getIdendityValidationMessage = (identityType: string) => {
    return getIdentityValidationMessageList[identityType] ?? '';
}

export const relationList = [
    { label: "Father", value: "father" },
    { label: "Mother", value: "mother" },
    { label: "Brother", value: "brother" },
    { label: "Grand Father", value: "Grandfather" },
    { label: "Grand Mother", value: "Grandmother" },
    { label: "Son", value: "son" },
    { label: "Daughter", value: "daughter" },
    { label: "Partner", value: "partner" },
    { label: "Uncle", value: "uncle" },
    { label: "Aunt", value: "aunt" },
    { label: "Nephew", value: "nephew" },
    { label: "Niece", value: "niece" },
    { label: "Cousin", value: "cousin" },
    { label: "Spouse", value: "spouse" },
    { label: "Friend", value: "friend" },
    { label: "Other", value: "other" },
];


// Address Dropdown 
export const divisionList = [
    { label: "Barishal", value: 1 },
    { label: "Chattogram", value: 2 },
    { label: "Dhaka ", value: 3 },
    { label: "Khulna ", value: 4 },
    { label: "Rajshahi", value: 5 },
    { label: "Rangpur", value: 6 },
    { label: "Sylhet", value: 7 },
];

export const districtList = [
    { label: "Chattogram", value: 1 },
    { label: "Dhaka", value: 2 },
    { label: "Rangamati", value: 3 },
    { label: "Faridpur", value: 4 },
    { label: "Nowakhali", value: 5 },
];

export const areaList = [
    { label: "Karnaphuli", value: 1 },
    { label: "Patiya", value: 2 },
    { label: "Mohakhali", value: 3 },
    { label: "Jatrabari", value: 4 },
];

export const nomineeList = [
    { label: "Mr. Rahim", value: 1 },
    { label: "Mr. Karim", value: 2 },
    { label: "Mr. Abul Kalam", value: 3 },
    { label: "Mr. Zihad", value: 4 },
];

export const heightMeasurementList = [
    {
        label: "Feet",
        value: "ft",
    },
    {
        label: "Inches",
        value: "in",
    },
    {
        label: "Meter",
        value: "m",
    },
    {
        label: "Centemeter",
        value: "cm",
    },
];

export const weightMeasurementList = [
    {
        label: "KG",
        value: "kg",
    },
    {
        label: "LBS",
        value: "lbs",
    },
]

