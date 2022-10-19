import dotenv from "dotenv";
dotenv.config();

export const config = {
    PORT: 3000,
    corsOptions: {
        origin: "*",
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    },
};

export const dbConfig = {
    user: process.env.DB_USER || "Admin",
    password: process.env.DB_PWD || "Admin",
    database: process.env.DB_NAME || "ЛомбардКлон",
    server: process.env.DB_SERVER || "localhost\\SQLSERVER",
    options: {
        trustServerCertificate: true,
    },
};
