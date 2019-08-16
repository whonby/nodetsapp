"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path = __importStar(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const route = require("./router/web");
class Application {
    constructor() {
        this.app = express_1.default();
        this.setting();
        this.middlewares();
        this.route();
    }
    setting() {
        try {
            this.app.set("port", 3000);
            this.app.set('views', path.resolve(__dirname, "views"));
            this.app.engine(".hbs", express_handlebars_1.default({
                layoutsDir: path.resolve(this.app.get("views"), "layouts"),
                partialsDir: path.resolve(this.app.get("views"), "partials"),
                defaultLayout: "template",
                extname: ".hbs"
            }));
            this.app.set("view engine", ".hbs");
        }
        catch (e) {
            console.log(e);
        }
    }
    middlewares() {
        this.app.use(body_parser_1.default.json());
    }
    route() {
        this.app.use(route);
        this.app.use(express_1.default.static(path.resolve(__dirname, "public")));
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Serveur est lance", this.app.get("port"));
        });
    }
}
exports.default = Application;
