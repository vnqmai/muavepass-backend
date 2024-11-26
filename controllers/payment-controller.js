const express = require("express");
const router = express.Router();
const payOS = require("../utils/payos");

router.post("/payos", async function (req, res) {
  console.log("payment handler");
  const webhookData = payOS.verifyPaymentWebhookData(req.body);

  console.log("webhookData", webhookData);

  if (
    ["Ma giao dich thu nghiem", "VQRIO123"].includes(webhookData.description)
  ) {
    console.log("success", webhookData);
    return res.json({
      error: 0,
      message: "Ok",
      data: webhookData
    });
  }

  // Source code uses webhook data
  console.log("success 1", webhookData);
  return res.json({
    error: 0,
    message: "Ok",
    data: webhookData
  });
});

module.exports = router;
