export const bodyParser = (req, res, next) => {
  for (const fieldName in req.body) {
    if (Object.hasOwnProperty.call(req.body, fieldName)) {
      req.body[fieldName] = JSON.parse(req.body[fieldName]);
    }
  }

  next();
};
