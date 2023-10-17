import express, { Application, Response, Request } from "express";
import crypto from "crypto";
import axios from "axios";

interface iData {
  name?: string;
  price?: number;
  id?: string;
}

const dataSet: iData[] = [];

const port: number = 2030;

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  try {
    return res.status(200).json({
      message: "reading data",
      data: dataSet,
    });
  } catch (error) {
    throw error;
  }
});

app.post("/create", (req: Request, res: Response): Response => {
  try {
    // grabbing/collecting from the request body
    const { name, price } = req.body;

    const ID = dataSet.length + 1;

    const newID = crypto.randomUUID();
    const newID2 = crypto.randomBytes(16).toString("hex");

    const newObj = {
      id: newID,
      name,
      price,
    };

    dataSet.push(newObj);

    return res.status(201).json({
      message: "creating data",
      data: newObj,
    });
  } catch (error) {
    throw error;
  }
});
app.get("/:id", (req: Request, res: Response): Response => {
  try {
    const { id } = req.params;

    let readData = dataSet.filter((el: iData) => {
      return el?.id === id;
    });

    return res.status(200).json({
      message: "getting single data",
      data: dataSet,
    });
  } catch (error) {
    throw error;
  }
});
app.get("/api/github", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const url = `https//api.github.com/users/${name}`;

    let myData = await axios.get(url).then((res) => {
      // console.log(res);
      return res.data;
    });

    res.status(200).json({ message: "success", data: myData });
  } catch (error) {
    if (error) {
      res.write(`This is a 404 message`);
      res.end();
    } else {
      res.end();
    }
  }
});

app.delete("/delete", (req: Request, res: Response) => {
  const { price } = req.body;

  const DeleteDTS = dataSet.filter((el: any) => {
    return el?.price !== price;
  });

  return res.status(201).json({
    message: "Deleting from Express",
    data: DeleteDTS,
  });
});

app.patch("/:id", (req: Request, res: Response) => {
  const { name } = req.body;

  let newObj = {};

  return res.status(201).json({
    message: "Updating express data",
    data: dataSet,
  });
});

app.get("/api/weather", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    // const url =  `http://api.weatherapi.com/v1/current.json?key=9a821aac05604a209e9153915230606&q=${name}&aqi=yes`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name},uk&callback=test&appid=8c06575a03c30abd67e6794b6c363a4d`;

    const newUrl = await axios.get(url).then((res) => {
      return res.data;
    });

    console.log(newUrl);

    return res.status(200).json({
      message: "Access Weather API with express",
      data: newUrl,
    });
  } catch (error) {
    throw error;
  }
});

app.listen(port, () => {
  console.log("server is on and listening to port:", port);
});
