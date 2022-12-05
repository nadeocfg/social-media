import jwt from "jsonwebtoken";

const protect = async (request, response, next) => {
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = request.headers.authorization.slice(7);

      const decoded = jwt.verify(token, process.env.jwtSecret || "");
    } catch {
      response.status(401).json({
        message: "Invalid or expired token",
      });
      return;
    }
  }

  if (!request.headers.authorization) {
    response.status(401).json({
      message: "Invalid or expired token",
    });
    return;
  }

  next();
};

export default protect;
