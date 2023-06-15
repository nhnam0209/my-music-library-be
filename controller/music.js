const db = require("../config/database");
const path = require('path');
const fs = require('fs');


module.exports = {
  delete_music: (req, res) => {
    db.query(
      "DELETE FROM music WHERE id = ? ",
      [req.body.id],
      (err, result) => {
        if (err) {
          return res.status(500).send({
            err: err,
            msg: "Something wrong!!",
          });
        } else {
          return res.status(200).send({
            msg: "The song has been deleted!",
            result: result,
            isDelete: true,
          });
        }
      }
    );
  },

  add_music: (req, res) => {
    const requiredFields = [
      "id",
      "title",
      "artist",
      "album",
      "genre",
      "release_year",
      "imageFile",
      "audioFile"
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).send({
        msg: "Missing fields in request body: " + missingFields.join(", "),
        isAdd: false,
      });
    }
    try {
      db.query("SELECT * FROM music", (err, result) => {
        if (err) {
          return res.status(400).send({
            err: err,
            msg: "Something wrong!!",
          });
        }
        if (result) {
          db.query(
            "INSERT INTO music (id, title, artist, album, genre, release_year, image, audio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              req.body.id,
              req.body.title,
              req.body.artist,
              req.body.album,
              req.body.genre,
              req.body.release_year,
              req.body.imageFile,
              req.body.audioFile,

            ],
            (err, result) => {
              if (err) {
                return res.status(500).send({
                  err: err,
                  msg: "Something wrong!!",
                });
              } else {
                return res.status(200).send({
                  msg: "The song has been add with us!",
                  result: result.affectedRow,
                  isAdd: true,
                });
              }
            }
          );
        }
      });
    } catch (error) {
      return res.status(500).send({
        err: error,
        isAdd: false,
        msg: "Error adding song",
      });
    }

  },

  edit_music: (req, res) => {
    const {
      title,
      artist,
      album,
      genre,
      release_year,
      imageFile,
      audioFile,
      id
    } = req.body;

    db.query(
      `UPDATE music SET 
      title = IF(LENGTH(?) = 0, title, ?),
      artist = IF(LENGTH(?) = 0, artist, ?),
      album = IF(LENGTH( ? ) = 0, album , ? ),
      genre = IF(LENGTH( ? ) = 0, genre, ? ),
      release_year = IF(LENGTH(?) = 0, ?, release_year),
      image = IF( ? IS NULL, image, ? ),
      audio = IF( ? IS NULL, audio, ? )
      WHERE id = ?`,
      [title, title, artist, artist, album, album, genre, genre, release_year, release_year, imageFile, imageFile, audioFile, audioFile, id],
      (err, result) => {
        if (err) {
          return res.status(500).send({
            err: err,
            msg: "Something wrong!!",
          });
        } else {
          return res.status(200).send({
            msg: "The song has been updated in database!",
            result: result.affectedRow,
            isUpdate: true,
          });
        }
      }
    );
  },
  query_music: (req, res) => {
    db.query("SELECT * FROM music", (err, result) => {
      if (err) {
        console.log("error:", err);
        return res.status(500).send({
          error: err,
          msg: "Something went wrong",
        });
      } else {
        return res.status(200).send({
          list_music: result,
        });
      }
    });
  },

  search_music: (req, res) => {
    db.query(
      `SELECT * FROM cars WHERE title LIKE ? AND artist LIKE ? AND title LIKE ?  AND genre LIKE ?`,
      [`%${req.body.search_item}%`],
      (err, result) => {
        if (err) {
          console.log("error", err);
          return res.status(500).send({
            error: err,
          });
        }
        return res.status(200).send({
          list_music: result,
        });
      }
    );
  },

};