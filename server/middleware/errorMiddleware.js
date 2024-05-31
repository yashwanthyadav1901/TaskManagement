const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);
  const statuscode = err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json({ message: err.message });
};

module.exports = errorHandler;
