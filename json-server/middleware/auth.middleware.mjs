export const isAuthenticated = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).send({
      error: 'User is not authenticated',
    });
  }

  // Extract token & append to request
  const token = authHeader.replace('Bearer ', '');
  req.token = token;

  next();
};