const router = require('express').Router();

const { User, Comment } = require('../../db/models');

router.get('/:trackId/comments', async (req, res) => {
  try {
    const { trackId } = req.params;
    const comments = await Comment.findAll({
      where: {
        trackId,
      },
      include: User,
      raw: true,
      nest: true,
    });
    res.json(comments);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/comments', async (req, res) => {
  try {
    if (req.session.userId) {
      const { userId } = req.session;
      const { trackId, text } = req.body;

      const comment = await Comment.create({
        userId,
        trackId,
        text,
      });
      const newComment = await Comment.findOne({
        where: {
          id: comment.id,
        },
        include: User,
        raw: true,
        nest: true,
      });
      res.json(newComment);
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

module.exports = router;
