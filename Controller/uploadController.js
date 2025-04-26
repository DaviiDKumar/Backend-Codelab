import cloudinary from '../Cloudinary/cloudinaryConfig.js';
import fs from 'fs';
import { User } from '../Model(Schema)/userSchema.js';
import path from 'path';

export const uploadImage = async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;

    // Check if file exists before uploading
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on server' });
    }

    // Upload Image to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads', // Cloudinary Folder
    });

    // Delete file from server only if upload is successful
    if (result) {
      fs.unlinkSync(filePath);
      console.log(`✅ Image uploaded successfully: ${result.secure_url}`);
    }

    // Fetch user
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user image URL
    user.profilePicture = result.secure_url;
    await user.save();

    res.status(200).json({
      message: 'Image uploaded and user updated successfully',
      url: result.secure_url,
    });

  } catch (error) {
    console.error('❌ Image upload failed:', error);

    // Delete the file if any error happens
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};
