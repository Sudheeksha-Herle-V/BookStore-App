import Order from "../model/order.model.js";
import Cart from "../model/cart.model.js";
import Book from "../model/book.model.js";

// ------------------ PLACE ORDER ------------------

export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.bookId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 🛑 STOCK CHECK BEFORE ORDER
    const insufficientItems = [];

    for (const item of cart.items) {
      const book = await Book.findById(item.bookId._id);

      if (!book || book.count < item.quantity) {
        insufficientItems.push({
          name: item.bookId.name,
          requested: item.quantity,
          available: book?.stock ?? 0,
        });
      }
    }


    if (insufficientItems.length > 0) {
      return res.status(400).json({
        message: "Some items are out of stock",
        items: insufficientItems,
      });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.bookId.price * item.quantity,
      0
    );

    // Create the order
    const order = new Order({
      userId,
      customer: {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
      },
      items: cart.items.map(item => ({
        bookId: item.bookId._id,
        quantity: item.quantity,
      })),
      total: totalAmount,
    });

    await order.save();

    // 🧾 REDUCE STOCK
    for (const item of cart.items) {
      const book = await Book.findById(item.bookId._id);
      book.stock -= item.quantity;

      if (book.stock <= 0) {
        book.stock = 0;
        book.outOfStock = true;
      }
      await book.save();
    }

    // clear cart
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    res.status(200).json({ message: "Order placed successfully", order });

  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// ------------------ GET ORDERS FOR USER ------------------

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate("items.bookId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------ ADMIN ROUTES ------------------

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({ status: "Pending" }).populate("items.bookId");
  res.json(orders);
};

export const getShippedOrders = async (req, res) => {
  const orders = await Order.find({ status: "Shipped" }).populate("items.bookId");
  res.json(orders);
};

export const getDeliveredOrders = async (req, res) => {
  const orders = await Order.find({ status: "Delivered" }).populate("items.bookId");
  res.json(orders);
};

// ------------------ STATUS UPDATES ------------------

export const markOrderShipped = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.orderId,
    { status: "Shipped" },
    { new: true }
  );

  res.json({ message: "📦 Order marked as shipped", order });
};

export const markOrderDelivered = async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) return res.status(404).json({ message: "Order not found" });

  if (order.status === "Delivered") {
    return res.status(400).json({ message: "Order already delivered." });
  }

  order.status = "Delivered";
  await order.save();

  res.json({ message: "Order marked as delivered", order });
};
