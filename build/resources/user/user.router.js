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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const routes = (0, express_1.Router)();
const checkUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role, password } = req.body;
    if (!password) {
        yield res.status(201).json("ERROR: password is empty");
    }
    next();
});
routes
    .route('/')
    .get(user_controller_1.CrudUser.getMany)
    .post(checkUserInfo, user_controller_1.CrudUser.createOne);
routes
    .route('/:id')
    .get(user_controller_1.CrudUser.getOne);
routes
    .route('/role/:value')
    .get(user_controller_1.CrudUser.getDoctor);
exports.default = routes;
