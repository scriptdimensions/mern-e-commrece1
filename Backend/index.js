import express from "express";
import Users from "./db/Users.js";
import Product from "./db/Product.js";
import bodyParser from "body-parser";
import cors from "cors";
import "./db/config.js";
const server = express();
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());
server.post("/register", async (req, res) => {
    let user = new Users(req.body);
    let result = await user.save();
    res.send(req.send);
});
server.post("/login", async (req, res) => {
    let user = await Users.findOne(req.body);
    if (user) {
        res.send(user)
    } else {
        res.send({ result: "no user" })
    }
})
server.get("/products", async (req, res) => {
    try {
        let product = await Product.find();
        res.send(product)
    } catch (error) {
        res.status(500).json({ error: "no product" })
    }
})
server.get("/product/:id", async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).json({ error: "not found" });
        }
        res.json(product);

    } catch (error) {
        res.status(500).json({ error: "no product" })
    }
})
server.put("/product/:id", async (req, res) => {
    let product = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json(product);
});
server.delete("/product/:id", async (req, res) => {
    let product = await Product.deleteOne({ _id: req.params.id });
    res.json(product);
});
server.post("/add", async (req, res) => {
    let item = new Product(req.body);
    let result = await item.save();
    res.send(req.body);
});
server.get("/search/:key", async (req, res) => {
    let products = await Product.find({
        title: { $regex: req.params.key, $options: "i" }
    });
    res.status(200).json(products);
});
server.listen(5000, () => {
    console.log("runing..")
});

