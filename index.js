const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const payOS = require("./utils/payos");

require("./db/client");

const app = express();
const PORT = process.env.PORT || 3030;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static("public"));
app.use("/payment", require("./controllers/payment-controller"));
app.use("/order", require("./controllers/order-controller"));
app.use('/product', require('./controllers/product-controller'));

app.post("/create-payment-link", async (req, res) => {
  const YOUR_DOMAIN = "http://localhost:3001";
  const body = {
    orderCode: Number(String(Date.now()).slice(-6)),
    // amount: amount,
    description: "Thanh toan don hang",
    returnUrl: `${YOUR_DOMAIN}/result?orderCode=${res.orderCode}`,
    cancelUrl: `${YOUR_DOMAIN}/result`,
  };

  try {
    const paymentLinkResponse = await payOS.createPaymentLink(body);
    res.redirect(paymentLinkResponse.checkoutUrl);
  } catch (error) {
    console.error(error);
    res.send("Something went error");
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
