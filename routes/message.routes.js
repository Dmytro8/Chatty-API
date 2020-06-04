const express = require("express");
const MessageModel = require("../models/Message");
const router = express.Router();

// GET Request /api/messages?dialog=dialogId
router.get("", async (req, res) => {
  try {
    const dialogId = req.query.dialog;
    await MessageModel.find({ dialog: dialogId })
      .populate(["dialog"])
      .exec((err, messages) => {
        if (err) return res.status(500).json(err);
        if (!messages)
          return res.status(400).json({ message: "Messages doesn't found" });
        return res.status(200).json(messages);
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

// POST Request /api/messages/create
router.post("/create", async (req, res) => {
  try {
    const messageBody = req.body.messageBody;
    const dialogId = req.body.dialogId;
    const userId = "5e919c160c87048cc857cc81";
    const message = new MessageModel({
      message_body: messageBody,
      dialog: dialogId,
      message_author: userId,
    });
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

// DELETE Request /api/messages/:id
router.delete("/:id", async (req, res) => {
  try {
    await MessageModel.findByIdAndDelete(
      req.params.id,
      req.body,
      (err, dialog) => {
        if (err) return res.status(500).json(err);
        if (!dialog)
          return res.status(400).json({ message: "Message doesn't found" });
        return res
          .status(200)
          .json({ message: "Message has been successfully deleted" });
      }
    );
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Server encountered an error" });
  }
});

module.exports = router;
