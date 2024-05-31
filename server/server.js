const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "resource doesn't exist" });
  } else {
    res.type("txt").send("resource doesn't exist");
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${3500}`);
});
