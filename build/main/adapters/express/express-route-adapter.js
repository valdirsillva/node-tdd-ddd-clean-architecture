"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapterRoute = void 0;
const adapterRoute = (controller) => {
    return async (req, res) => {
        const httpRequest = {
            body: req.body
        };
        const httpResponse = await controller.handle(httpRequest);
        if (httpResponse.statusCode === 200) {
            res.status(httpResponse.statusCode).json(httpRequest.body);
        }
        else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            });
        }
    };
};
exports.adapterRoute = adapterRoute;
