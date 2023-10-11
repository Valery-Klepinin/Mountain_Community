const router = require('express').Router();
const { Track, Image } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const tracks = await Track.findAll({
      include: [Image],
      nest: true,
    });
    res.json(tracks);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.delete('/:trackId', async (req, res) => {
  try {
    const { trackId } = req.params;
    const result = await Track.destroy({
      where: { id: trackId },
    });
    if (result > 0) {
      res.status(204).json({ message: 'ok' });
      return;
    }
    res.status(404).json({ message: 'Маршрут не найден' });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/add', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const { title, description } = req.body;

    const value = (a) => {
      if (a === 'true') {
        return true;
      }
      return false;
    };

    const { img } = req.files;

    const newTrack = await Track.create({
      title,
      description,
    });

    let newArray = [];
    if (Array.isArray(img)) {
      newArray = [...img];
    } else {
      newArray = [img];
    }

    await Promise.all(
      newArray.map((el) => {
        el.mv(`${__dirname}/../../photos/${el.name}`, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
        return Image.create({ trackId: newTrack.id, img: `/${el.name}` });
      })
    );

    const newNewTrack = await Track.findOne({
      where: { id: newTrack.id },
      include: [{ model: Image }],
    });
    res.json(newNewTrack);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put('/update/:trackId', async (req, res) => {
  try {
    const { trackId } = req.params;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const { title, description } = req.body;
    const { img } = req.files;

    const value = (a) => {
      if (a === 'true') {
        return true;
      }
      return false;
    };

    const [, [{ dataValues: track }]] = await Track.update(
      {
        title,
        description,
      },
      {
        where: { id: Number(trackId) },
        returning: true,
      }
    );

    let newArray = [];
    if (Array.isArray(img)) {
      newArray = [...img];
    } else {
      newArray = [img];
    }

    await Promise.all(
      newArray.map((el) => {
        el.mv(`${__dirname}/../../photos/${el.name}`, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
        return Image.update(
          { img: `/${el.name}` },
          {
            where: { trackId: track.id },
            returning: true,
          }
        );
      })
    );

    const newTrack = await Track.findOne({
      where: { id: track.id },
      include: [{ model: Image }],
      row: true,
    });
    res.json(newTrack);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
