const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const MusicRoute = require("./routes/music");
const PORT = process.env.PORT || 8000;

app.use(express.json({
  limit: "50mb"
}));
app.use(express.urlencoded({
  limit: "50mb",
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true
}));
app.use(cors());

app.use("/api/music", MusicRoute);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API server listening on PORT ${PORT}`);
  });
}