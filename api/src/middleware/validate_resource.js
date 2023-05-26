"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observability_1 = require("../config/observability");
const validateResource = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    }
    catch (error) {
        observability_1.logger.error(error.error);
        return res.status(400).send(error.error);
    }
};
exports.default = validateResource;
