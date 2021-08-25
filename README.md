## Netlify Deploy Notes

- set proxy to server
- npm run build
- netlify deploy
- point to ./build

## Heroku Deploy Notes

- Branch to local deploy repo
- Set ecosystem.config.js env variables
- Move typescript dev dependencies up so that yarn tsc can compile to dist/ on Heroku server
- git subtree push --prefix server heroku main
