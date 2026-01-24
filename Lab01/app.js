import express from "express";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "wdA7qUlGx15cb6Bk55FZwSMPBL0B9pIF0CjxrQ7qpMD",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", userRouter);

app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

export default app;
