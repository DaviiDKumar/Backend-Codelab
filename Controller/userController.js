import { User } from "../Model(Schema)/userSchema.js";
import { comparePassword } from "../Utils/password.js";
import { generateRefreshToken, generateAccessToken } from "../Utils/jwt.js";





export const fetchUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");
        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json({ message: "Users fetched successfully", users });
        console.log(` ✅ Users Fetched Successfully : `)
    }
    catch (error) {
        console.error("Error in fetchUsers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};// End of fetchUsers function


export async function fetchUserbyID(req, res) {
    try {
        const userId = req.params.id; // Assuming the user ID is passed in the request parameters

        // Check if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).send({ message: "Invalid User ID" });
            return console.log("Invalid User ID")
        }

        // Convert userId to ObjectId if valid
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).send({ message: "User not found" });
            return console.log("User not found");
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error in fetchUserbyID:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
}




export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // 🆔 Get User ID from URL
        const { name, email, phone, address, bio } = req.body; // 📦 Get Updated Data from Request Body

        // 🔍 Find and Update User
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, phone, address, bio }, {
            new: true, // Returns the updated user
            runValidators: true, // Ensures data validation
        }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
        console.log(` User Updated SuccessfullY ${updatedUser}`)
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔍 Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ message: "User not found" });
        }

        // 🔑 Compare entered password with hashed password
        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            console.log("❌ Invalid password attempt");
            return res.status(401).json({ message: "Invalid password" });
        }

        console.log(`✅ User Logged In: ${user.name}`);

        // Generate JWT token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const newUser = user.toObject();
        delete newUser.password;    // ✅ Password hide karo

        res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                path: "/"
            }) // ✅ This just sets the cookie, does not send a response yet

            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                path: "/"
            }) // ✅ Another cookie set, still no response yet
            .status(200) // ✅ Now, setting the response status
            .json({ message: "Login successful", user: newUser, }); // ✅ Finally, sending the response



    } catch (error) {
        console.error(`❌ ERROR: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const logout = (req, res) => {
    try {
        res
            .cookie("accessToken", "", {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                expires: new Date(0),
                path: "/",
            })
            .cookie("refreshToken", "", {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                expires: new Date(0),
                path: "/",
            })
            .status(200)
            .json({ message: "Logout Successful" });

        console.log("✅ Logout Successful: Access and Refresh tokens cleared.");
    } catch (error) {
        console.error("❌ Logout Failed:", error);
        res.status(500).json({ message: "Logout Failed" });
    }
};



export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id); // Fix the method here
        if (!user) return res.status(404).json({ message: "User not found" }); // Corrected status

        await User.findByIdAndDelete(id);

        console.log(`✅ User Deleted`);
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error(`❌ ERROR: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
