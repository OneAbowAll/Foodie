import express, { json } from "express";
import cors from "cors";

const app = express();

const api = express.Router();

app.use(json());
app.use(cors());
app.use("/api", api);