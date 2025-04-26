import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order API
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Amount in paisa
      currency: "INR",
      receipt: "order_rcpt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};
export const paymentVerification = async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
  
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ message: "Missing payment details" });
      }
  
      const body = razorpay_order_id + "|" + razorpay_payment_id;
  
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");
  
      console.log("Expected Signature:", expectedSignature);
  
      if (expectedSignature === razorpay_signature) {
        return res.status(200).json({ message: "Payment Verified Successfully" });
      } else {
        return res.status(400).json({ message: "Payment Verification Failed" });
      }
    } catch (error) {
      console.error("Verification Error:", error);
      return res.status(500).json({ message: "Error during verification", error });
    }
  };
  