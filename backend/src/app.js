import "dotenv/config";
import "./clients/db";
import express from "express";
import Boom from "boom";
import cors from "cors";
import limiter from "./rate-limiter";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((req, res, next) => {
   const error = Boom.notFound("This route does not exist.");
   next(error);
});

app.use((err, req, res, next) => {
   console.log(err);

   if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output.payload);
   }

   res.status(500).json({ message: "Internal Server Error" });
});

app.listen(4000, () => console.log("Server is up!"));
