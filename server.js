const app = require("./index");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rbaghele:N9960372626n@apt-nodejs-cluster01.bqmfa.mongodb.net/node-learning?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected."))
  .catch((err) => {
    console.log(err);
  });

app.listen(9000, () => {
  console.log("server is running on port 9000");
});
