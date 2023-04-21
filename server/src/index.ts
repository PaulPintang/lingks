import express from "express";
import cors from "cors";
import connectDB from "./config/conn";
import errorHandler from "./middleware/errorMiddleware";
import dotenv from "dotenv";
dotenv.config();

connectDB();
const app = express();

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/bookmark", require("./routes/bookmarkRoutes"));
app.use(errorHandler);

app.listen(5000, () => console.log("Server is running on PORT 5000"));
