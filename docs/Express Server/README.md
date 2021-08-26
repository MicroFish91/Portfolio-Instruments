# Express Server Notes

## General Features

- Email Validations
- Data Validation
- Error Handling/Middleware
- Passport... JWT Auth + Bcrypt PW Encryption
- Node Cron Schedules
- Custom Error Logging
- Custom Seeders

## Postgres Database Tables

- Users
- Snapshots
- Accounts
- Holdings
- Logs

## Heroku Deploy

- Branch to local deploy repo
- Set ecosystem.config.js env variables
- Move typescript dev dependencies up so that yarn tsc can compile to dist/ on Heroku server
- git subtree push --prefix server heroku main
