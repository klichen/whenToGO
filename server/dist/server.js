"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const getScheduleData_1 = require("./utils/getScheduleData");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// const port = process.env.PORT;
const port = 8000;
app.use((0, cors_1.default)({
    origin: "http://192.168.0.29:5173", // use your actual domain name (or localhost), using * is not recommended
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
}));
app.get("/", (req, res) => {
    res.send("whenToGO API");
});
app.get("/schedule", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, fromStop, toStop } = req.query;
        const url = new URL("https://api.gotransit.com/v2/schedules/en/timetable/all");
        url.searchParams.append("fromStop", fromStop);
        url.searchParams.append("toStop", toStop);
        url.searchParams.append("date", date);
        const apiResponse = yield fetch(url.toString());
        const apiResponseJson = yield apiResponse.json();
        const processedData = (0, getScheduleData_1.getScheduleData)(apiResponseJson);
        res.json(processedData);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}));
app.listen(port, "192.168.0.29", () => {
    console.log(`[server]: Server is running at http://192.168.0.29:${port}`);
});
