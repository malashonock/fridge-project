const login = (router) => (req, res) => {
  const { db } = router;

  const { userName, password } = req.body;
  const user = db
    .getState()
    .users.find((user) => user.name === userName && user.password === password);

  if (!user) {
    return res.status(401).send({
      error: 'Invalid credentials',
    });
  }

  // Generate fake JWT token
  const createdAt = new Date();
  const token = `${user.id.toString().padStart(3, '0')}@${createdAt.getTime()}`;
  const expiresAt = new Date(createdAt.getTime() + 2 * 7 * 24 * 60 * 60 * 1000); // add 2 weeks

  db.setState({
    ...db.getState(),
    tokens: [...db.getState().tokens, token],
  });
  db.write();

  // Return session data
  const { id, name, role } = user;
  res.send({
    user: {
      id,
      name,
      role,
    },
    token,
    expiresAt: expiresAt.toISOString(),
  });
};

const logout = (router) => (req, res) => {
  const { db } = router;

  // Token should have been appended to request by isAuthenticated middleware
  const tokenToRemove = req.token;

  // Remove JWT token from db
  const tokenFound = db
    .getState()
    .tokens.find((token) => token === tokenToRemove);

  if (!tokenFound) {
    res.status(404).send({
      error: 'Session token not found',
    });
  }

  db.setState({
    ...db.getState(),
    tokens: db.getState().tokens.filter((token) => token !== tokenFound),
  });
  db.write();

  res.status(200).end();
};

export default {
  login,
  logout,
};
