rm -rf ~/.npm
rm -rf .next
rm -rf node_modules
npm cache clean --force
npm run clean
npm i
