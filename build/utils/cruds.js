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
exports.crudControllers = exports.getDoctor = exports.createOne = exports.getMany = exports.getOne = void 0;
const getOne = (model) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield model
            .findById({ _id: req.params.id })
            .lean()
            .exec();
        if (!doc) {
            return res.status(400).end();
        }
        res.status(200).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
exports.getOne = getOne;
const getMany = (model) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield model
            .find({})
            .lean()
            .exec();
        res.status(200).json({ data: docs });
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
exports.getMany = getMany;
const createOne = (model) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield model.create(Object.assign({}, req.body));
        res.status(201).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
exports.createOne = createOne;
// export const updateOne = model => async (req: Request, res: Response) => {
//   try {
//     const updatedDoc = await model
//       .findOneAndUpdate(
//         {
//           createdBy: req.user._id,
//           _id: req.params.id
//         },
//         req.body,
//         { new: true }
//       )
//       .lean()
//       .exec()
//     if (!updatedDoc) {
//       return res.status(400).end()
//     }
//     res.status(200).json({ data: updatedDoc })
//   } catch (e) {
//     console.error(e)
//     res.status(400).end()
//   }
// }
//   export const removeOne = (model:string) => async (req: Request, res: Response) => {
//     try {
//       const removed = await model.findOneAndRemove({
//         createdBy: req.user._id,
//         _id: req.params.id
//       })
//       if (!removed) {
//         return res.status(400).end()
//       }
//       return res.status(200).json({ data: removed })
//     } catch (e) {
//       console.error(e)
//       res.status(400).end()
//     }
//   }
const getDoctor = (model) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield model.find({ "role": req.params.value }).exec();
        if (!doc) {
            return res.status(400).end();
        }
        res.status(200).json({ data: doc });
    }
    catch (e) {
        console.error(e);
        res.status(400).end();
    }
});
exports.getDoctor = getDoctor;
const crudControllers = (model) => ({
    // removeOne: removeOne(model),
    // updateOne: updateOne(model),
    getMany: (0, exports.getMany)(model),
    getOne: (0, exports.getOne)(model),
    createOne: (0, exports.createOne)(model),
    getDoctor: (0, exports.getDoctor)(model)
});
exports.crudControllers = crudControllers;
