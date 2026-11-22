export const authenticate = async function (req, res, next) {
  try {
    next();
  } catch (error) {}
};

export const authorise = function (...role) {
  // return async
  next();
};

export const authMiddleware = { authenticate, authorise };
