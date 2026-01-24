import express from "express";
import productRouter from "./routes/productRoute.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/products");
});
