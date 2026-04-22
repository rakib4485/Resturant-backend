import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// import rout from "./routes/orderRoutes.js";
import routes from "./routes/orderRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", routes);
app.use("/api/time", routes);
app.use("/api/menu", routes);
app.use("/api/admin", adminRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the Restaurant API");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});