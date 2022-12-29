const name = [
    {
        id:1,
        label:"First Name",
        type:"text",
        placeholder:"First Name",
        required:true,
        name:"firstName"
        
    },
    {
        id:2,
        label:"Middle Name",
        type:"text",
        placeholder:"Middle Name",
        required: false,
        name:"middleName"
    },
    {
        id:3,
        label:"Last Name",
        type:"text",
        placeholder:"Last Name",
        required:true,
        name:"lastName"
    },
    {
        id:4,
        label:"Suffix",
        type:"select",
        required:false,
        name: "suffix",
        options:[
            {
                id:1,
                value:"Jr.",
                label:"Jr."
            },
            {
                id:2,
                value:"Sr.",
                label:"Sr."
            },
            {
                id:3,
                value:"III",
                label:"III"
            },
            {
                id:4,
                value:"IV",
                label:"IV"
            },
            {
                id:5,
                value:"",
                label:"None"
            },
        ]
    },
];

const address = [
    {
        id:7,
        label:"House Number",
        type:"text",
        placeholder:"House Number",
        required: true,
        name: "houseNumber"
    },
    {
        id:8,
        label:"Street",
        type:"text",
        placeholder:"Street",
        required: true,
        name: "street"
    },
    {
        id:9,
        label:"Barangay",
        type:"text",
        placeholder:"Barangay",
        required: true,
        name: "barangay"
    },
    {
        id:10,
        label:"City",
        type:"text",
        placeholder:"City",
        required: true,
        name: "city"
    },
];

export const userInputs = [
    [...name],
    [
        {
            id:5,
            label:"Birthdate",
            type:"date",
            placeholder:"Birthdate",
            required:true,
            name: "birthdate"
        },
    ],
    [...address]
];



export const staffInputs = [
    [...name],
    [
        {
            id:5,
            label:"Mobile Number",
            type:"contact",
            placeholder:"Mobile Number",
            required:true,
            name: "mobileNumber"
        },
        {
            id:6,
            label:"Birthdate",
            type:"date",
            placeholder:"Birthdate",
            required:true,
            name: "birthdate"
        },
    ],
    [...address],
    [
        {
            id:11,
            label:"Role",
            type:"select",
            placeholder:"Role",
            required: true,
            name: "role",
            options:[
                {
                    id:1,
                    value:"phys",
                    label:"Physician"
                },
                {
                    id:2,
                    value:"staff",
                    label:"Staff"
                },
            ]
        },
        {
            id:12,
            label:"Username",
            type:"text",
            placeholder:"Username",
            required: true,
            name: "username"
        },
        {
            id:13,
            label:"Password",
            type:"password",
            placeholder:"Password",
            required: true,
            name: "password"
        },
    ]
]