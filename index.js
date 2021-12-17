const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const CORS = require("cors");
require("dotenv").config();
const app = express();

app.use(CORS());
const port = process.env.PORT || 4000;

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.9ppr5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = () => {
  const products = client.db("accessories").collection("products");

  app.get("/products", async (req, res) => {
    const cursor = products.find({});
    const data = await cursor.toArray();
    res.json(data);
  });
  app.get("/product/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };

    const data = await products.findOne(query);
    res.json(data);
  });
};
client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    run();
  }
});

app.get("/", (req, res) => {
  res.send("Tech vision server running 🚀");
});

app.listen(port, () => {
  console.log("Server running at port: ", port);
});
