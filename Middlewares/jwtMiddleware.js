import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from "../Utils/jwt.js"; 

export const protect = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // 🔹 First, Try Verifying Access Token
    if (accessToken) {
        try {
            const decoded = verifyAccessToken(accessToken); 
            req.user = decoded;
            return next();
        } catch (error) {
            console.log("❌ Access Token Expired or Invalid");
        }
    }

    // 🔹 If Access Token Fails, Try Refresh Token
    if (refreshToken) {
        try {
            const decoded = verifyRefreshToken(refreshToken); 

            // ✅ Generate a New Access Token
            const newAccessToken = generateAccessToken(decoded.id); // Pass only `id`

            // ✅ Set New Access Token in Cookies
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                path: "/",
                maxAge: 15 * 60 * 1000, // 15 minutes expiration
            });

            req.user = { id: decoded.id }; // Attach user info
            return next();
        } catch (error) {
            console.log("❌ Refresh Token Expired or Invalid");
        }
    }

    // 🔹 If No Valid Token, Deny Access
    return res.status(401).json({ message: "Access denied. Please log in again." });
};
