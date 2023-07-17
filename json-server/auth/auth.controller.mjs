class AuthController {
  constructor(db) {
    this.db = db;
  }

  signup = (req, res) => {
    const { userName, email, role, password } = req.body;

    const userId = this.db._.createId(this.db.getState().users);
    const newUser = {
      id: userId,
      name: userName,
      email,
      role,
      password,
    };

    this.db.setState({
      ...this.db.getState(),
      users: [...this.db.getState().users, newUser],
    });
    this.db.write();

    res.status(201).send(newUser);
  };

  login = (req, res) => {
    const { userName, password } = req.body;
    const user = this.db
      .getState()
      .users.find(
        (user) => user.name === userName && user.password === password
      );

    if (!user) {
      return res.status(401).send({
        error: 'Invalid credentials',
      });
    }

    // Generate fake JWT token
    const createdAt = new Date();
    const token = `${user.id
      .toString()
      .padStart(3, '0')}@${createdAt.getTime()}`;
    const expiresAt = new Date(
      createdAt.getTime() + 2 * 7 * 24 * 60 * 60 * 1000
    ); // add 2 weeks

    this.db.setState({
      ...this.db.getState(),
      tokens: [...this.db.getState().tokens, token],
    });
    this.db.write();

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

  logout = (req, res) => {
    // Token should have been appended to request by isAuthenticated middleware
    const tokenToRemove = req.token;

    // Remove JWT token from db
    const tokenFound = this.db
      .getState()
      .tokens.find((token) => token === tokenToRemove);

    if (!tokenFound) {
      res.status(404).send({
        error: 'Session token not found',
      });
    }

    this.db.setState({
      ...this.db.getState(),
      tokens: this.db.getState().tokens.filter((token) => token !== tokenFound),
    });
    this.db.write();

    res.status(200).end();
  };
}

export default AuthController;
