import { User } from "../Model(Schema)/userSchema.js";
import { nameValidation, emailValidation, passwordValidation } from "../Utils/validation.js";
import { hashPassword } from "../Utils/password.js";




export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 🔹 Validate name
        const { error: nameError } = nameValidation.validate(name);
        if (nameError) return res.status(400).json({ message: nameError.details[0].message });

        // 🔹 Validate email
        const { error: emailError } = emailValidation.validate(email);
        if (emailError) return res.status(400).json({ message: emailError.details[0].message });

        // 🔹 Validate password
        const { error: passwordError } = passwordValidation.validate(password);
        if (passwordError) return res.status(400).json({ message: passwordError.details[0].message });


        // 🔹 Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`User already exists`);
            return res.status(400).json({ message: "User already exists" });
        }

        // 🔹 Hash the password
        const hashedPassword = await hashPassword(password);

        // 🔹 Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        
        console.log(` ✅ User created Successfully : `)
        res.status(201).json({ message: " User registered successfully" });

    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};
