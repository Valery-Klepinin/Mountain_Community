const router = require('express').Router();
const { Post } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// eslint-disable-next-line consistent-return
router.post('/add', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    // console.log(req.body);
    const { title, description } = req.body;
    const { img } = req.files;
    const newPost = await Post.create({
      title,
      description,
      img: `/${img.name}`,
    });
    img.mv(`${__dirname}/../../photosPost/${img.name}`, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json(newPost);
    });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete('/:postId', async (req, res) => {
  if (req.session.userId) {
    try {
      const { postId } = req.params;
      const result = await Post.destroy({
        where: { id: postId },
      });
      if (result > 0) {
        res.status(204).json({ message: 'ok' });
        return;
      }
      res.status(404).json({ message: 'Пост не найден' });
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  }
});

router.put('/:postId', async (req, res) => {
  console.log(00000000000);
  if (req.session.userId) {
    try {
      const { postId } = req.params;
      const { img } = req.files;
      const { title, description } = req.body;
      const [, [{ dataValues: post }]] = await Post.update(
        {
          title,
          description,
          img: `/${img.name}`,
        },
        {
          where: { id: postId },
          returning: true,
        }
      );
      console.log(post[1]);
      res.json(post);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  }
});

module.exports = router;
