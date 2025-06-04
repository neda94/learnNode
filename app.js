const path = require("path");
const express = require("express");

const adminRoute = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const User = require("./models/user");

const mongoConnection = require("./util/dataBase").mongodbConnect;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findUserByID("68387dcffb294720a8289c00")
    .then((user) => {
      req.user = new User(user.userName, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use("/admin", adminRoute);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).send("Page not found!");
});

mongoConnection(() => {
  app.listen(3000);
});
