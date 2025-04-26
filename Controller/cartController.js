import { User } from "../Model(Schema)/userSchema.js"; // Correct import of the User model

export const saveCartItems = async (req, res) => {
    const { userId } = req.params; // Destructure userId correctly from params
    const { cartItems } = req.body;

    console.log("➡️ Received Request to Save Cart Items");
    console.log("User ID:", userId, typeof userId);
    console.log("Cart Items:", cartItems);

    try {
        // Check if userId is valid before proceeding
        if (!userId) {
            console.log("❌ Missing User ID");
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            console.log("❌ User Not Found for ID:", userId);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("✅ User Found:", user.name);

        // Update the user's cart
        user.cart = cartItems; // Overwrite the cart with the new cartItems
        await user.save();

        console.log("🛒 Cart Items Updated Successfully:", cartItems);

        res.status(200).json({ message: "Cart items updated successfully" });
    } catch (error) {
        console.log("❌ Error in saveCartItems:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
