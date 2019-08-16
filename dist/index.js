"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//require("./database/database");
const database_1 = __importDefault(require("./database/database"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const route = require("./router/web");
database_1.default();
const app = express_1.default();
app.use(body_parser_1.default.json());
app.get("/", (req, resp) => {
    resp.send("Helo express");
});
app.listen(8085, () => {
    console.log("Le serve est lence");
});
app.use(route);
