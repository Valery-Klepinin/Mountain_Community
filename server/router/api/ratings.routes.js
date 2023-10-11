const router = require('express').Router();

const { Rating, Track } = require('../../db/models');

router.post('/', async (req, res) => {
  if (req.session.userId) {
    const { userId } = req.session;
    const { trackId, rating } = req.body;
    try {
      const userRating = await Rating.findOne({
        where: {
          userId,
          trackId,
        },
      });

      if (userRating) {
        userRating.rating = rating;
        await userRating.save();
      } else {
        await Rating.create({
          userId,
          trackId,
          rating,
        });
      }

      const allRatings = await Rating.findAll({
        where: {
          trackId,
        },
      });

      const totalRating = allRatings.reduce(
        (acc, currentRating) => acc + currentRating.rating,
        0
      );

      const averageRating = totalRating / allRatings.length;

      const track = await Track.findByPk(trackId);
      track.rating = averageRating;
      await track.save();

      res.json({ averageRating });
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  }
});

module.exports = router;
