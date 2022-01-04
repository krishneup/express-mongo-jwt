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
var employees = [
    { id: 20, name: 'Ajay', salary: 55 },
    { id: 24, name: 'Vijay', salary: 35000 },
    { id: 56, name: 'Rahul', salary: 32000 },
    { id: 88, name: 'Raman', salary: 38000 }
];
let data = employees.map((item) => {
    return item.id;
});
console.log(data);
let dog = {
    name: "dog"
};
let cow = {
    name: "cow",
    honey: true
};
const isPass = (...args) => __awaiter(void 0, void 0, void 0, function* () {
    let [person, marks] = args;
    return marks > 40 ? true : false;
});
const hari = isPass("harie", 50);
console.log(hari);
const isDoctor = (education, age) => {
    return new Promise((resolve, reject) => {
        if (education === "MBA" && age > 25) {
            // return true;
            resolve(true);
        }
        else {
            reject(false);
        }
    });
};
let launchMe = () => __awaiter(void 0, void 0, void 0, function* () {
    //  await console.log()
    let data = yield isDoctor("MBA", 6);
    return data;
});
launchMe().then((response) => {
    console.log(response);
}).catch((error) => console.log(error));
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});
Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values);
}).catch((error) => {
    console.log(error);
});
