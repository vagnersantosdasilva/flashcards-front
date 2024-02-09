
let envVars = {BASE_URL:'http://localhost:8082'}
if (process.env.NODE_ENV == 'production'){
    envVars = {BASE_URL:'https://api.memobeam.com.br'}
}
module.exports = envVars;
