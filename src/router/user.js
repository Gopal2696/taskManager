const User = require("../models/user");
const express = require("express");
const auth = require("../Middleware/auth");
const router = new express.Router();

router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken();
        // await user.save()
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send("cannot login");
    }
});

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save("logout successfully");
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post("/users/logoutall", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        console.log(req.user);
        await req.user.save();
        res.send("all are logout");
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/users/me", auth, async (req, res) => {
    res.status(200).send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
    const allowedmethod = ["name", "age", "password", "email"];
    const givenmethod = Object.keys(req.body);
    const isvalidallowedmethod = givenmethod.every((update) =>
        allowedmethod.includes(update)
    );
    if (!isvalidallowedmethod) {
        res.status(400).send({ error: "invalid update!" });
    }
    try {
        givenmethod.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();

        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;
