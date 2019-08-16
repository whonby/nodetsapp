"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function database() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = "mongodb://localhost:27017/BIBLI02";
        try {
            yield mongoose_1.default.connect(uri, {
                useNewUrlParser: true
            });
            console.log(">>> Connection etablie a la base de donnée....");
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.default = database;
