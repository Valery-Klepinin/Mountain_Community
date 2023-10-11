const router = require('express').Router();

const { Favorite, Track, Image } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const { userId } = req.session;
    const favorites = await Favorite.findAll({
      where: { userId },
      include: [{ model: Track, include: [{ model: Image }] }],
    });
    res.json(favorites);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.put('/:trackId', async (req, res) => {
  if (req.session.userId) {
    const { userId } = req.session;
    const { trackId } = req.body;
    try {
      const existingFavorite = await Favorite.findOne({
        where: {
          userId,
          trackId,
        },
      });
      if (!existingFavorite) {
        await Favorite.create({
          userId,
          trackId,
        });
        const [favorite] = await Favorite.findAll({
          where: { userId, trackId },
          include: [{ model: Track, include: [{ model: Image }] }],

          nest: true,
        });
        res.json(favorite);
      } else {
        const result = await Favorite.destroy({
          where: { trackId, userId },
        });
        if (result > 0) {
          res.json({ trackId, message: 'success' });
          return;
        }
        res.json({ message: 'error' });
      }
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  }
});

module.exports = router;
