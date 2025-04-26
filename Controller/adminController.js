import { Admin } from "../Model(Schema)/adminSchema.js";
import { hashPassword, comparePassword } from "../Utils/password.js";
import { generateAccessToken ,generateRefreshToken } from "../Utils/jwt.js";

export const createAdmin = async (req, res) => {


    const { name, email, phone, password } = req.body;

    try {

        if (!name || !email || !phone || !password) {

            console.log("All fields required")
            res.send("All Fields required")
        }

        //Check if existing user  

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log(`Admin already exists`);
            return res.status(400).json({ message: "Admin already exists" });
        }



        const hashedPassword = await hashPassword(password);

        const newAdmin = new Admin({ name, email, password: hashedPassword, phone });
        await newAdmin.save();



        console.log(` ✅ Admin created Successfully : `)
        res.status(201)
            .json(
                {
                    message: " Admin registered successfully",
                    admin: {
                        id: newAdmin._id,
                        name: newAdmin.name,
                        email: newAdmin.email,
                        phone: newAdmin.phone,
                        isAdmin: newAdmin.isAdmin,
                        createdAt: newAdmin.createdAt,
                    },
                }
            );


    }
    catch (error) {

        console.error(`ERROR: ${error.message}`);
        res.status(500).json({ message: error.message });
    }

}

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if all fields are provided
        if (!email || !password) {
            console.log("❌ All fields are required");
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if admin exists
        const adminExist = await Admin.findOne({ email });

        if (!adminExist) {
            console.log("❌ Admin not found");
            return res.status(404).json({ message: "Invalid email or password" });
        }

        // Compare hashed password
        const isMatch = await comparePassword(password, adminExist.password);

        if (!isMatch) {
            console.log("❌ Incorrect password attempt");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log(`✅ Admin Logged In: ${adminExist.name}`);

        // Generate JWT token
        const accessToken = generateAccessToken(adminExist);
        const refreshToken = generateRefreshToken(adminExist);

        // Convert to object and remove password before sending
        const newAdmin = adminExist.toObject();
        delete newAdmin.password;

        res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                path: "/"
            }) // ✅ Set refresh token cookie

            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                path: "/"
            }) // ✅ Set access token cookie

            .status(200) // ✅ Set response status
            .json({ admin: newAdmin }); // ✅ Send response

    } catch (error) {
        console.error(`❌ ERROR: ${error.message}`);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

