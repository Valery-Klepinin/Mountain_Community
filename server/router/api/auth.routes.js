const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (name === '' || email === '' || password === '') {
    res.status(404).json({ success: false, message: 'Заполните все поля' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hash });

    req.session.userId = user.id;

    res.locals.user = user;

    res.json({ success: true, user: { name, email, password: hash } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Пользователь не зарегистрирован',
      });
      return;
    }

    if (
      !(await bcrypt.compare(password, user.password)) &&
      user.password !== password
    ) {
      res.status(404).json({
        success: false,
        message: 'Неправильный пароль',
      });
      return;
    }

    req.session.userId = user.id;

    res.locals.user = user;

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/check', (req, res) => {
  try {
    if (req.session.userId) {
      const { user } = res.locals;

      res.json({ success: true, user });
    } else {
      res.json({ success: true, user: undefined });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Ошибка при удалении сессии' });
    }
    res.clearCookie('user_sid');
    return res.json({ message: 'Удалена сессия' });
  });
});

module.exports = router;
