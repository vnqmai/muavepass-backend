const express = require("express");
const router = express.Router();
const payOS = require("../utils/payos");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const Order = require("../models/Order");

router.post("/create", async function (req, res) {
  const { description, returnUrl, cancelUrl, amount } = req.body;
  const body = {
    orderCode: Number(String(new Date().getTime()).slice(-6)),
    amount: amount,
    description,
    cancelUrl,
    returnUrl,
  };

  try {
    const paymentLinkRes = await payOS.createPaymentLink(body);

    return res.json({
      error: 0,
      message: "Success",
      data: {
        bin: paymentLinkRes.bin,
        checkoutUrl: paymentLinkRes.checkoutUrl,
        accountNumber: paymentLinkRes.accountNumber,
        accountName: paymentLinkRes.accountName,
        amount: paymentLinkRes.amount,
        description: paymentLinkRes.description,
        orderCode: paymentLinkRes.orderCode,
        qrCode: paymentLinkRes.qrCode,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: -1,
      message: "fail",
      data: null,
    });
  }
});

router.post("/create-order-log", async function (req, res) {
  const { orderCode, productId, userName, userEmail, userPhone, userId } = req.body;
  const body = {
    order_id: orderCode,
    product_id: productId,
    email: userEmail,
    phone: userPhone,
    fullname: userName,
    status: "IN_PROGRESS",
    user_id: userId
  };

  Order.create(body).then((order) => {
    return res.json({
      error: 0,
      message: "ok",
      data: order,
    });
  });
});

router.put("/:orderId/success", async function (req, res) {
  const { orderId } = req.params;
  Order.updateOne({ order_id: orderId.toString() }, { status: "PAID" }).then(() => {
    return res.json({
      error: 0,
      message: "ok",
      data: null,
    });
  })
});

router.get("/:orderId", async function (req, res) {
  try {
    const order = await payOS.getPaymentLinkInfomation(req.params.orderId);
    
    // await Transaction.insertMany(order.transactions);
    await Order.updateOne({ order_id: order.orderCode }, { status: "PAID" });
    const orderLog = await Order.findOne({ order_id: order.orderCode });
    await Product.updateOne({ _id: orderLog.product_id }, { status: "sold" });

    if (!order || !orderLog) {
      return res.json({
        error: -1,
        message: "failed",
        data: null,
      });
    }
    return res.json({
      error: 0,
      message: "ok",
      data: orderLog,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: -1,
      message: "failed",
      data: null,
    });
  }
});

router.put("/:orderId", async function (req, res) {
  try {
    const { orderId } = req.params;
    const body = req.body;
    const order = await payOS.cancelPaymentLink(
      orderId,
      body.cancellationReason
    );
    if (!order) {
      return res.json({
        error: -1,
        message: "failed",
        data: null,
      });
    }
    return res.json({
      error: 0,
      message: "ok",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      error: -1,
      message: "failed",
      data: null,
    });
  }
});

router.post("/confirm-webhook", async (req, res) => {
  const { webhookUrl } = req.body;
  try {
    await payOS.confirmWebhook(webhookUrl);
    return res.json({
      error: 0,
      message: "ok",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      error: -1,
      message: "failed",
      data: null,
    });
  }
});

router.post("/purchase", async (req) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { productId, user } = req.body;

  try {
    // Tìm vé còn trống
    const ticket = await Product.findOneAndUpdate(
      { product_id: productId, status: "in_stock" },
      { status: "sold", user },
      { new: true, session }
    );

    if (!ticket) {
      throw new Error("Vé này đang được chọn và trong quá trình thanh toán. Vui lòng chọn vé khác hoặc thử lại sau ít phút.");
    }
    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return ticket;
  } catch (error) {
    // Rollback nếu có lỗi
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

module.exports = router;