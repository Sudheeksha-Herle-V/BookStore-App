import express from "express";
import Cart from "../model/cart.model.js";
import Order from "../model/order.model.js";
import Book from "../model/book.model.js";

const router = express.Router();

router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, phone, address, total } = req.body;

  if (!name || !phone || !address || !total) {
    return res.status(400).json({ error: "All delivery details are required" });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate("items.bookId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Your cart is empty" });
    }

    // 🛑 CHECK & REDUCE COUNT
    for (let item of cart.items) {
      const bookId = item.bookId._id || item.bookId;
      const book = await Book.findById(bookId);

      if (!book) continue;

      console.log("Before count:", book.name, book.count);

      const newCount = book.count - item.quantity;
      book.count = newCount < 0 ? 0 : newCount;

      // Optional: mark unavailable
      book.outOfStock = book.count === 0;

      await book.save();

      console.log("After count:", book.name, book.count);
    }

    // Create order
    const newOrder = new Order({
      userId,
      customer: { name, phone, address },
      items: cart.items,
      total,
      createdAt: new Date(),
    });

    await newOrder.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(200).json({
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Something went wrong during checkout" });
  }
});

export default router;
