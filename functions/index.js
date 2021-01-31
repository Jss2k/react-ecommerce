const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51ICHAvCgYOuOQ4hS2PKsirRdxclAwmf4ycN7ugnTVPdjKB97tXmTVCvXQ2NUvuMRLnuku3W9MtFW5Kan6zWxz2Zu00ME0vXf9X");

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.post("/payments/create", async (req, res) => {
  try {
    const { amount, shipping } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: "usd"
    });

    res
      .status(200)
      .send(paymentIntent.client_secret);

  } catch (err) {
    res
      .status(500)
      .json({
        statusCode: 500,
        message: err.message
      });
  }
})

app.get("*", (req, res) => {
  res
      .status(404)
      .send("404, Not found");
});

exports.api = functions.https.onRequest(app);

