import { Server } from "socket.io";
import { createServer } from "http";
import bodyParser from "body-parser";
import express, {Request, Response,Application} from "express";
import cors from 'cors'
import dotenv from "dotenv";
import userRoutes from "./routes/users";
dotenv.config();

import socket from "./controllers/socket";
import connectDB from "./db/connect";

const app:Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

app.use(bodyParser.json({ limit: "30mb", type: "application/json"}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use("/user", userRoutes);

app.get("/", (req:Request, res:Response) => {
  res.send("Server is running");
});

io.on("connection", socket);

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    httpServer.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
