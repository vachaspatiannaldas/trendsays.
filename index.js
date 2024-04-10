import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

// Components
import Connection from './database/db.js';
import Router from './routes/route.js';

const app = express();

const corsConfig ={
    origin: "*",
    credential: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};

app.options("", cors(corsConfig));
app.use(cors(corsConfig));

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', Router);

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
