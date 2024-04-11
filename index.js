import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
const PORT = process.env.PORT;
const HOST = process.env.VERCEL_URL;
// Components
import Connection from './database/db.js';
import Router from './routes/route.js';
dotenv.config();
const app = express();

const corsConfig ={
    origin: "*",
    credential: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};

app.options("", cors(corsConfig));
app.use(cors(corsConfig));
//this


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', Router);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }
  



const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT,HOST, () => console.log(`Server is running successfully on PORT ${HOST} ${PORT}`));
