require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "api.portfolioinstruments",
      script: "./dist/app.js",
      env_production: {
        NODE_ENV: "production",
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_TITLE: process.env.DB_TITLE,
        DB_HOST: process.env.DB_HOST,
        GMAIL_USER: process.env.GMAIL_USER,
        GMAIL_PASS: process.env.GMAIL_PASS,
        SERVER_BASE_URL: process.env.SERVER_BASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        EMAIL_SECRET: process.env.EMAIL_SECRET,
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
