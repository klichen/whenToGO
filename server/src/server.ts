import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getScheduleData } from "./utils/getScheduleData";
import cors from "cors";
dotenv.config();

const app: Express = express();
// const port = process.env.PORT;
const port = 3000;

app.use(
  cors({
    // origin: "http://192.168.0.29:5173",
    origin: "https://whentogo-pwvi.onrender.com",
    methods: ["GET", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("whenToGO API");
});

app.get("/schedule", async (req: Request, res: Response) => {
  try {
    const { date, fromStop, toStop } = req.query;
    const url = new URL(
      "https://api.gotransit.com/v2/schedules/en/timetable/all"
    );
    url.searchParams.append("fromStop", fromStop as string);
    url.searchParams.append("toStop", toStop as string);
    url.searchParams.append("date", date as string);

    const apiResponse = await fetch(url.toString());
    const apiResponseJson = await apiResponse.json();
    const processedData = getScheduleData(apiResponseJson);
    res.json(processedData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running on port ${port}`);
});
