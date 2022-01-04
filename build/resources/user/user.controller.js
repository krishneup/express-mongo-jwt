"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudUser = void 0;
const cruds_1 = require("../../utils/cruds");
const user_model_1 = require("./user.model");
exports.CrudUser = (0, cruds_1.crudControllers)(user_model_1.User);
