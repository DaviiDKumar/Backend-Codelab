import { Course } from "../Model(Schema)/coursesSchema.js";

// ✅ Fetch All Courses (Excluding Videos)
export const fetchCourses = async (req, res) => {
    try {
        const courses = await Course.find().select("-videos"); // Exclude 'videos' field

        if (courses.length === 0) {
            console.log("❌ No courses found");
            return res.status(404).json({ message: "No courses found" });
        }

        console.log(`✅ Courses Fetched Successfully (${courses.length} courses)`);
        res.status(200).json({ message: "Courses fetched successfully", courses });
    } catch (error) {
        console.error("❌ Error in fetchCourses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// ✅ Create a New Course
export const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            longDescription,
            price,
            keyLearnings,
            requirements,
            category,
        } = req.body;

        // ✅ Validate required fields
        if (!title || !description || !longDescription || !price) {
            console.log("❌ Missing required fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Ensure 'learn' and 'requirements' are arrays (fallback to empty array if undefined)
        const learnArray = Array.isArray(keyLearnings) ? keyLearnings : [];
        const requirementsArray = Array.isArray(requirements) ? requirements : [];

        // ✅ Create and Save Course
        const newCourse = new Course({
            title,
            description,
            longDescription,
            price,
            keyLearnings: learnArray,
            requirements: requirementsArray,
            category,
        });

        await newCourse.save();
        console.log("✅ Course Created Successfully:", newCourse);
        res.status(201).json({ message: "Course created successfully", course: newCourse });

    } catch (error) {
        console.error("❌ Create Course Error:", error);
        res.status(500).json({ message: "Failed to create course", error: error.message });
    }
};

// ✅ Fetch a Single Course by ID
export const fetchCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            console.log(`❌ Course Not Found: ${id}`);
            return res.status(404).json({ message: "Course not found" });
        }
        console.log(`✅ Course Fetched Successfully: ${id}`);
        res.status(200).json({ message: "Course fetched successfully", course });
    } catch (error) {
        console.error("❌ Error in fetchCourse:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Update a Course by ID
export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;




        const course = await Course.findByIdAndUpdate(id, updatedData, { new: true });
        if (!course) {
            console.log(`❌ Course Not Found: ${id}`);
            return res.status(404).json({ message: "Course not found" });
        }
        console.log(`✅ Course Updated Successfully: ${id}`);
        res.status(200).json({ message: "Course updated successfully", course });
    } catch (error) {
        console.error("❌ Error in updateCourse:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Delete a Course by ID
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            console.log(`❌ Course Not Found: ${id}`);
            return res.status(404).json({ message: "Course not found" });
        }
        console.log(`✅ Course Deleted Successfully: ${id}`);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("❌ Error in deleteCourse:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Delete All Courses (Bulk Delete)
export const deleteAllCourses = async (req, res) => {
    try {
        const result = await Course.deleteMany({}); // Delete all documents from Course collection

        if (result.deletedCount === 0) {
            console.log("⚠️ No courses to delete");
            return res.status(404).json({ message: "No courses found to delete" });
        }

        console.log(`🧹 All Courses Deleted (${result.deletedCount} total)`);
        res.status(200).json({ message: "All courses deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
        console.error("❌ Error in deleteAllCourses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
