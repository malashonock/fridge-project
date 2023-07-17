const replaceUserName = (req, res, next) => {
  const payload = req.body;

  if (payload && typeof payload === 'object' && 'userName' in payload) {
    const userName = payload.userName;
    delete payload.userName;
    payload.name = userName;
    req.body = payload;
  }

  next();
};

export default replaceUserName;