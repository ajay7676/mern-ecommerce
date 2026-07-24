// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import productRoutes from './routes/productRoutes.js'
import productRoutes from "./modules/product/routes/product.routes.js";
import productVariantRoutes from "./modules/catalog/routes/productVariant.routes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./modules/catalog/routes/category.routes.js";
import categoryAttributeRoutes from "./modules/catalog/routes/categoryAttribute.routes.js";
// import cartRoutes from './routes/cartRoutes.js'
import cartRoutes from "./modules/cart/routes/cart.routes.js";
// import orderRoutes from './routes/orderRoutes.js'
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors({
//     // origin: "http://localhost:5173",
//     origin: "https://mern-ecommerce-ccpg.onrender.com",
//     credentials: true,
// }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-ecommerce-ccpg.onrender.com",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,

  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;

app.use("/api/v1", productRoutes);
app.use("/api/v1", productVariantRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", categoryAttributeRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", cartRoutes);
// app.use("/api/v1" ,orderRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.use(errorHandler);

await connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT Number ${PORT}`);
});

// Unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
