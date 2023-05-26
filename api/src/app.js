"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const index_route_1 = __importDefault(require("./routes/index_route"));
const createApp = async () => {
    const app = (0, express_1.default)();
    // // Configuration
    // Middleware
    app.use(express_1.default.json());
    // app.use(cors({
    //     origin: originList()
    // }));
    // API Routes
    app.use(index_route_1.default);
    // Swagger UI
    // const swaggerDocument = yaml.load("./openapi.yaml");
    // app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    return app;
};
exports.createApp = createApp;
