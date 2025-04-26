import bcrypt from 'bcryptjs';

// Function to hash a password
export const hashPassword = async (password) => {
  try {
    // Generate salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
};



// Function to compare passwords
export const comparePassword = async (password, hashedPassword) => {
  try {
    // Compare the plain password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing password: ' + error.message);
  }
};
