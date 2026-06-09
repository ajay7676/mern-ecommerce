import express from "express";
import dotenv from "dotenv";
import productRoutes from './routes/productRoutes.js'
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;


app.use("/api" ,productRoutes );
app.use(errorHandler);

app.listen(PORT , () => {
              connectDB();
              console.log(`Server is running on PORT Number ${PORT}`);

})