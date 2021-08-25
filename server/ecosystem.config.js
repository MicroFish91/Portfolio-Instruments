module.exports = {
  apps: [
    {
      name: "Portfolio_Instruments_Server",
      script: "./dist/app.js",
      env_production: {
        NODE_ENV: "production",
        DB_USERNAME: "",
        DB_PASSWORD: "",
        DB_TITLE: "",
        DB_HOST: "",
        GMAIL_USER: "",
        GMAIL_PASS: "",
        CLIENT_BASE_URL: "",
        SERVER_BASE_URL: "",
        JWT_SECRET: "",
        EMAIL_SECRET: "",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
