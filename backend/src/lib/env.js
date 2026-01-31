import "dotenv/config";



export const ENV = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    CLIENT_URL: process.env.CLIENT_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

};


// PORT=3000
// MONGO_URI=mongodb+srv://hanunsreedhar_db_user:nE3GrJGFii38r2cX@cluster0.b9w6ust.mongodb.net/chatify_db?appName=Cluster0

// NODE_ENV=development

// JWT_SECRET=myjwtsecret

// RESEND_API_KEY=re_WkBszFXX_2RCPET1b1YRrV9ENSvnTwf9d

// EMAIL_FROM="onboarding@resend.dev"

// EMAIL_FROM_NAME="Hanun Sreedharan"

// // add client url
// CLIENT_URL="https://chatify-oh61.vercel.app/"