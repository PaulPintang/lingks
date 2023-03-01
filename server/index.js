const express = require("express");
const cors = require("cors");
const connectDB = require("./config/conn");
const errorHandler = require("./middleware/errorMiddleware");
const dotenv = require("dotenv");
dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/post", require("./routes/postRoutes"));
app.use(errorHandler);

app.listen(5000, () => console.log("Server is running on PORT 5000"));
