const express = require("express");
const DialogModel = require("../models/Dialog");
const router = express.Router();

// GET Request /api/dialog/:ownerId
router.get("/:ownerId", async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    await DialogModel.find({ owner: ownerId })
      .populate([
        { path: "owner", select: "-password" },
        { path: "partner", select: "-password" },
      ])
      .exec((err, dialogs) => {
        if (err) return res.status(500).json(err);
        if (!dialogs)
          return res.status(400).json({ message: "Dialog doesn't found" });
        return res.status(200).json(dialogs);
      });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

// POST Request /api/dialog/create
router.post("/create", async (req, res) => {
  try {
    const ownerId = req.body.ownerId;
    const partnerId = req.body.partnerId;
    const newDialog = await DialogModel.findOne({
      owner: ownerId,
      partner: partnerId,
    });
    if (newDialog) {
      return res.status(400).json({ message: "Dialog is already exist" });
    }
    const dialog = new DialogModel({
      owner: ownerId,
      partner: partnerId,
    });
    await dialog.save();
    res.status(200).json({
      message: "Dialog has been successfully created",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

// DELETE Request /api/dialog/:id
router.delete("/:id", async (req, res) => {
  try {
    await DialogModel.findByIdAndDelete(
      req.params.id,
      req.body,
      (err, dialog) => {
        if (err) return res.status(500).json(err);
        if (!dialog)
          return res.status(400).json({ message: "Dialog doesn't found" });
        return res
          .status(200)
          .json({ message: "Dialog has been successfully deleted" });
      }
    );
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

module.exports = router;
