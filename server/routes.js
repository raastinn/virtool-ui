const path = require("path");
const fs = require("fs");

/**
 * Asynchronously returns requested .js file
 *
 * @func
 * @param req {object} the request object generated by express
 * @param res {object} the response object generated by express
 * @returns {N/A}
 */
exports.staticPath = (req, res) => {
  fs.readFile(path.join("dist", req.path), (err, data) => {
    if (err) throw err;
    res.type(path.basename(req.path));
    res.send(data);
  });
};

/**
 * Asynchronously returns index.html (virtool client entrypoint) as default path
 *
 * @func
 * @param req {object} the request object generated by express
 * @param res {object} the response object generated by express
 * @returns {N/A}
 */
exports.defaultPath = (req, res) => {
  fs.readFile(path.join("dist", "index.html"), (err, data) => {
    if (err) throw err;
    res.send(data.toString().replace(/{{ nonce }}/g, res.locals.nonce));
  });
};