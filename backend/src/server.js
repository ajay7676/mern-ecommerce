// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
// import productRoutes from './routes/productRoutes.js'
import productRoutes from './modules/product/routes/product.routes.js'
import userRoutes from './routes/userRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const PORT = process.env.PORT || 5000;


app.use("/api/v1" ,productRoutes );
app.use("/api/v1" ,userRoutes);
app.use("/api/v1" ,cartRoutes);
app.use("/api/v1" ,orderRoutes);

app.use(errorHandler);

app.listen(PORT , () => {
              connectDB();
              console.log(`Server is running on PORT Number ${PORT}`);

})

// Unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});