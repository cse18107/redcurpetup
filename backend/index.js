const app = require('./app');
const dotenv = require('dotenv');
const connect = require('./connect');

dotenv.config({path:'./.env'});


connect();

app.listen(process.env.PORT,()=>{
    console.log(`server is working on port ${process.env.PORT}`);
})