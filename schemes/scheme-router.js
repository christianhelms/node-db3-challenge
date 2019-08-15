const express = require("express");

const Schemes = require("./scheme-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Schemes.getSchemes()
    .then(schemes => {
      res.status(200).json(schemes);
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to get schemes" });
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Schemes.getById(id)
    .then(scheme => {
      if (scheme) {
        res.json(scheme);
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get scheme" });
    });
});

router.get('/:id/steps', async (req, res) => {
  const { id } = req.params;

  try {
    const steps = await Schemes.findSteps(id);

    if (steps.length) {
      res.json(steps);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find steps for given scheme' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get steps' });
  }
});

router.post('/', async (req, res) => {
  const schemeData = req.body;

  try {
    const scheme = await Schemes.add(schemeData);
    res.status(201).json(scheme);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new scheme' });
  }
});

router.post("/:id/steps", async (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  try {
    const scheme = await Schemes.getById(id);

    if (scheme) {
      const step = await Schemes.addStep(stepData, id);
      res.status(201).json(step);
    } else {
      res.status(404).json({ message: "Could not find scheme with given id." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to create new step" });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  console.log(id)

  try {
    const scheme = await Schemes.getById(id);

    if (scheme) {
      const updatedScheme = await Schemes.update(changes, id);
      res.status(201).json(updatedScheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to scheme' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Schemes.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete scheme' });
  }
});

module.exports = router;
