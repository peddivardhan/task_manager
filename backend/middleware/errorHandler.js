function errorHandler(err, req, res, next) {
    if (err.type === "entity.parse.failed") {
      return res.status(400).json({ error: "request body is not valid JSON" });
    }
    if (err.code === 11000) {
      return res.status(409).json({ error: "already exists" });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: "invalid id" });
    }
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
  
  module.exports = errorHandler;