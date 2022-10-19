import express from "express";
import sql from "mssql";
import { router } from "./routers/index.js";
import { config, dbConfig } from "./config.js";
import cors from "cors";

const start = async () => {
    console.log("Connection established");
    await sql.connect(dbConfig);
    console.log("Successfully connected");

    const app = express();

    app.use(express.json());

    app.use(cors(config.corsOptions)); // Use this after the variable declaration

    app.use(router);

    app.listen(config.PORT, () => {
        console.log(`Server is running at ${config.PORT}`);
    });
};

start().catch(console.error);
