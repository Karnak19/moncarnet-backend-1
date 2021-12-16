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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var vehiculesRouter = require("express").Router();
var prisma = new client_1.PrismaClient();
// get many vehicules (authorization: admin)
vehiculesRouter.get("/all", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicules;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.vehicules.findMany()];
            case 1:
                vehicules = _a.sent();
                res.json(vehicules);
                return [2 /*return*/];
        }
    });
}); });
// get one vehicule (authorization: all)
vehiculesRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var immat, vehicules;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                immat = String(req.params.id);
                return [4 /*yield*/, prisma.vehicules.findUnique({
                        where: {
                            immat: immat
                        }
                    })];
            case 1:
                vehicules = _a.sent();
                res.json(vehicules);
                return [2 /*return*/];
        }
    });
}); });
// get model's vehicule (authorization: all)
vehiculesRouter.get("/model/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vehicules;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, prisma.models.findUnique({
                        where: {
                            id_model: id
                        }
                    })];
            case 1:
                vehicules = _a.sent();
                res.json(vehicules);
                return [2 /*return*/];
        }
    });
}); });
// get brand vehicule (authorization: all)
vehiculesRouter.get("/model/:id/brand", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vehicules;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, prisma.models.findUnique({
                        where: {
                            id_model: id
                        },
                        select: {
                            brand: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    })];
            case 1:
                vehicules = _a.sent();
                res.json(vehicules);
                return [2 /*return*/];
        }
    });
}); });
// get user's vehicule (authorization: pros, admin)
vehiculesRouter.get("/user/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vehicules;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, prisma.users.findUnique({
                        where: {
                            id_user: id
                        }
                    })];
            case 1:
                vehicules = _a.sent();
                res.json(vehicules);
                return [2 /*return*/];
        }
    });
}); });
// post vehicule (authorization: user, admin)
vehiculesRouter.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicule, vehicules;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                vehicule = req.body;
                return [4 /*yield*/, prisma.vehicules.create({
                        data: {
                            immat: vehicule.immat,
                            registration_date: vehicule.registration_date,
                            model_id_model: vehicule.model_id_model,
                            user_id_user: vehicule.user_id_user,
                            types_id_type: vehicule.types_id_type,
                            url_vehiculeRegistration: vehicule.url_vehiculeRegistration
                        }
                    })];
            case 1:
                vehicules = _a.sent();
                res.json(vehicules);
                return [2 /*return*/];
        }
    });
}); });
// update vehicule (authorization: user, admin)
vehiculesRouter.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vehiculeUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.vehicules.update({
                        where: {
                            immat: id
                        },
                        data: {
                            immat: req.body.immat,
                            registration_date: req.body.registration_date,
                            model_id_model: req.body.model_id_model,
                            user_id_user: req.body.user_id_user,
                            types_id_type: req.body.types_id_type,
                            url_vehiculeRegistration: req.body.url_vehiculeRegistration
                        }
                    })];
            case 1:
                vehiculeUpdate = _a.sent();
                res.json(vehiculeUpdate);
                return [2 /*return*/];
        }
    });
}); });
// delete vehicule (authorization: user, admin)
vehiculesRouter["delete"]("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vehiculeDeleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.vehicules["delete"]({
                        where: {
                            immat: id
                        }
                    })];
            case 1:
                vehiculeDeleted = _a.sent();
                res.json(vehiculeDeleted);
                return [2 /*return*/];
        }
    });
}); });
module.exports = vehiculesRouter;
//# sourceMappingURL=vehicules.js.map