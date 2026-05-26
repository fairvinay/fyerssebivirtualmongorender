import express, { json, urlencoded } from "express";
import routes from './routes.js';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

 
//const routes = require('./routes').default
 
//import { razorpay } from "@lib/razorpay"
import Razorpay from 'razorpay';
import { Buffer } from "buffer";
 import {  user as User }   from './user.mjs';
//import './user.js';
import { Money } from './models.mjs';
//import  './models.js';
import axios from 'axios';
import  mongoose, { connectMongo } from './mongoose-setup.mjs';

 
//declare const Buffer;
let localSite = 'localhost:8000';
var localSiteStrings = [localSite, 'localhost:8888', 'localhost:8080', 'localhost:4200', 'localhost:3450'];
var regex = new RegExp(localSiteStrings.join("|"), "i");
let ourDomainPage = 'https://onedinaar.com/'
let   dbRoutes = undefined;

const PORT = process.env.PORT || 5115;


const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

// Enable CORS for all routes
const corsOrigins = process.env.CORS_ORIGINS ? 
  process.env.CORS_ORIGINS.split(',').map(origin => origin.trim()) : 
  [];

const corsMethods = process.env.CORS_METHODS ? 
  process.env.CORS_METHODS.split(',').map(method => method.trim()) : 
  ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

const corsHeaders = process.env.CORS_HEADERS ? 
  process.env.CORS_HEADERS.split(',').map(header => header.trim()) : 
  ['Content-Type', 'Authorization'];

app.use(cors({
  origin: [
    ...corsOrigins,
    /^http:\/\/localhost:\d+$/,  // Allow any localhost port
    /^http:\/\/127\.0\.0\.1:\d+$/ // Allow any 127.0.0.1 port
  ],
  methods: corsMethods,
  allowedHeaders: corsHeaders,
  credentials: process.env.CORS_CREDENTIALS !== 'true'
}));


 //let routes = routes1(app);
 
   let mongooseDB =  await connectMongo();
    let db = undefined;
    if(mongooseDB === undefined || mongooseDB ===null){
      mongooseDB =  await connectMongo();
      db = mongooseDB.createConnection(process.env.MONGOWALLSTREETURL);
      console.log('mongoose connection created using  mongoose.createConnection')
    }
    else {
       db = mongooseDB.createConnection(process.env.MONGOWALLSTREETURL);
        console.log('mongoose connection created using existing mongoose.createConnection')
    }
    // Pass the connection object as a parameter here
     if(db !==undefined && db !== null){
          dbRoutes =  routes(db);
            console.log(' passed mongoose connection  to routes ')
     }
    if(dbRoutes !== undefined && dbRoutes !== null ){
         app.use("/api", dbRoutes);
        
           console.log('  routes now contain the same app db connection ')
      }
      else {
        app.use("/api", routes);
        console.log('  routes with no app db connection ')
      }
    
 
//app.use("/api",routes )
 //process.env.PORT
//app.listen(PORT, () => {
//  console.log("listening on port " + PORT);//process.env.PORT
//});

const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
   // Log CORS configuration
        if (corsOrigins.length > 0) {
            console.log(`CORS Origins: ${corsOrigins.join(', ')}`);
        }
        console.log(`CORS Methods: ${corsMethods.join(', ')}`);
        console.log(`CORS Headers: ${corsHeaders.join(', ')}`);
        console.log(`CORS Credentials: ${process.env.CORS_CREDENTIALS !== undefined ? process.env.CORS_CREDENTIALS : false}`);


});


app.get("/", async (req, res) => {
  // const result=await sendMail();
  res.send("Onedinaar user registeration for MongoDB  with NodeJS on render.com ");
});

export default app

/**
 curl   http://localhost:8000/api/mail/write -H 'Content-Type:application/json'  -d "{\"email\":\"aadflaereg@gmail.com\"}"
 
  curl -i -X   POST  http://localhost:8000/api/mail/write -H 'Content-Type:application/json'  -d "{\"email\":\"aadflaereg@gmail.com\"}"

  curl -i -X   POST -H 'Content-Type:application/json'  -d "{\"email\": \"aadflaereg@gmail.com\" }"  http://localhost:8000/api/mail/write 

  THIS WORKED
  curl -H "Content-Type: application/json" -X POST  http://localhost:8000/api/mail/write -d "{\"Name\":\"Test Value\"}"
  THIS ALSO WORKED 
  curl -H "Content-Type: application/json" -X POST  http://localhost:8000/api/mail/write -d "{\"email\":\"re@fr.com\"}"

 curl -i -X POST -H "Content-Type:application/json" -d "{\"firstName\": \"Frodo\",  \"lastName\" : \"Baggins\" }" http://localhost:8080/people
 */
 /* 
  SETTIMEOUT  EXACT TEN TIMES 

  https://stackoverflow.com/questions/69241772/get-returned-items-from-function-inside-settimeout-in-javascript

          function myFunc(num) {
            return `Number: ${num}`;
          }
  

        function loop(theNum = 0) {
          if (theNum < 10) {
            console.log(myFunc(theNum));
            setTimeout(loop, 500, ++theNum);
          } else {
            console.log("All done");
          }
        }

        loop();





  GET VALUE OUT OF TIME OUT using PROMISE and async / await 
  
  https://stackoverflow.com/questions/24928846/get-return-value-from-settimeout


  function x() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
       resolve('done!');
      });
     });
  }
  x().then((done) => {
    console.log(done); // --> 'done!'
  });

 */
