import { User } from "../Model(Schema)/userSchema.js"; // Correct import of the User model

export const saveMyLearning = async (req, res) => {
    const { userId } = req.params; // Destructure userId correctly from params
    const { myLearningItems } = req.body;

    console.log("➡️ Received Request to Save My Learning Items");
  

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

        // Update the user's My Learning items
        user.myLearning = myLearningItems; // Overwrite with the new My Learning items
        await user.save();

        console.log("🎓 My Learning Items Updated Successfully:", myLearningItems);

        res.status(200).json({ message: "My Learning items updated successfully" });
    } catch (error) {
        console.log("❌ Error in saveMyLearning:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
