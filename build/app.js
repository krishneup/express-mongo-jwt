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
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config_1 = __importDefault(require("./utils/config"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./utils/db");
const user_router_1 = __importDefault(require("./resources/user/user.router"));
var app = (0, express_1.default)();
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path.join(__dirname, 'public')));
// define user routes
app.use('/api/user', user_router_1.default);
// app.post('/api/test', function (req:Request,res:Response, next:NextFunction) {
//   console.log(req.body.name)
//   next()
// })
// // app.use('/api/test', checkmeData)
// app.post('/api/test', function (req:Request,res:Response) {
//   res.send('we are at the root route of our server');
// })
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connect)();
        app.listen(config_1.default.port, () => {
            console.log(`working on port ${config_1.default.port}`);
        });
    }
    catch (e) {
        console.error(e);
    }
});
start();
