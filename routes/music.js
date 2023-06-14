const express = require("express");
const router = express.Router();
const music_controller = require("../controller/music");

router.get("/query_all", music_controller.query_music);
router.delete("/delete", music_controller.delete_music);
router.post("/add", music_controller.add_music);
router.put("/edit", music_controller.edit_music);
router.post("/search", music_controller.search_music);

module.exports = router;
