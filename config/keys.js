const keys = {
  port: process.env.PORT || 8000,
  apiUrl: "/api",
  clientUrl: "http://localhost:8000",
  images: {
    maxSize: 5242880,
    upload: {
      cloud_service: "Cloudinary",
      cloud_name: process.env.IMG_CLOUD_NAME,
      api_key: process.env.IMG_API_KEY,
      api_secret: process.env.IMG_API_SECRET,
    },
  },
  database: {
    name: "MongoDB",
    url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4h4xiez.mongodb.net/?retryWrites=true&w=majority`,
  },
  tokens: {
    access: {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiry: "1h",
    },
    refresh: {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiry: "7d",
      cookieExpiry: 7 * 24 * 60 * 60 * 1000, // 7 Days
    },
    emailVerification: {
      secret: process.env.EMAIL_TOKEN_SECRET,
      expiry: "6h",
      spamTimer: 3 * 60 * 1000, // 3 Minutes
    },
    passwordEmail: {
      secret: process.env.PASSWORD_TOKEN_SECRET,
      expiry: "1h",
      spamTimer: 3 * 60 * 1000, // 3 Minutes
    },
  },
  emailService: {
    name: "NodeMailer",
    port: 587,
    host: "smtp-mail.outlook.com",
    senderEmail: process.env.EMAIL_USER,
    senderPass: process.env.EMAIL_PASS,
  },
  payment: {
    service: "Stripe",
    publishableKey:
      "pk_test_51LyVsTDU7aeEbZLje58GKHELeqGebDbfvZXYYL2Zt1ORhrQESVY5dMQJTfARowglseuwq1GCV0OZCQxgWQvU8ns000XSXqFOEX",
    secretKey: process.env.PAYMENT_SECRET_KEY,
  },
};

export default keys;
