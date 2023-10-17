import express, { Application, Response, Request } from "express";
import crypto from "crypto";
import axios from "axios";

interface aData {
  name: string;
  amount: number;
  course?: string;
}

const setdata: aData[] = [];
const port: number = 2030;
const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  try {
    return res.status(200).json({
      message: "reading Data",
      data: setdata,
    });
  } catch (error) {
    throw error;
  }
});

app.post("/create", (req: Request, res: Response): Response => {
  try {
    // taking from the request body
    const { name, amount } = req.body;

    const COURSE = setdata.length + 1;

    const newCOURSE = crypto.randomUUID();
    const newCOURSE2 = crypto.randomBytes(16).toString("hex");

    const neewObj = {
      course: newCOURSE,
      name,
      amount,
    };

    setdata.push(neewObj);

    return res.status(201).json({
      message: "creating data",
      data: neewObj,
    });
  } catch (error) {
    throw error;
  }
});
app.get("/:id", (req: Request, res: Response): Response => {
  try {

  } catch (error) {
    throw error
  }
});

app.listen(port, () => {
  console.log("server is on and listening to port", port);
});
