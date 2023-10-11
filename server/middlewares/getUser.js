const { User } = require('../db/models');

async function getUser(req, res, next) {
  try {
    const { userId } = req.session;
    if (userId) {
      const user = await User.findOne({ where: { id: userId } });

      res.locals.user = user;
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
}

module.exports = getUser;
