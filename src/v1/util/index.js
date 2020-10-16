/**
 * Generates an internal error response with status code 500 and error message
 * @param {import("express").Response} response - Response object from express
 */

const internalErrorResponse = (response) => {
    response.status(500).json({
        isSuccess: false,
        message: 'INTERNAL_ERROR'
    });
};

/**
 * Generates a response with default status code i.e 200(OK) and with given message
 * @param {import("express").Response} response - Response Object from express
 * @param {String} message - Message to send in response
 */

const successResponse = (response, message) => {
    response.json({
        isSuccess: true,
        message
    });
};

/**
 * Generates a fail response with given message and status code.
 * @param {import("express").Response} response - Response object from express
 * @param {String} message - Message to send
 * @param {Number} status - Status code to send
 */

const customFailResponse = (response, message, status) => {
    response.status(status).json({
        isSuccess: false,
        message
    });
};

const responseGenerator = {
    internalErrorResponse,
    successResponse,
    customFailResponse
};

module.exports = { responseGenerator };
