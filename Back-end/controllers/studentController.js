const Student = require('../models/Student');

// @desc    Get all students
// @route   GET /api/students
exports.getStudents = async (req, res, next) => {
    try {
        const students = await Student.find().populate('enrolledCourses.course');
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single student
// @route   GET /api/students/:id
exports.getStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id).populate('enrolledCourses.course');

        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new student
// @route   POST /api/students
exports.createStudent = async (req, res, next) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({
            success: true,
            data: student
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update student
// @route   PUT /api/students/:id
exports.updateStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
exports.deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Enroll student in course
// @route   POST /api/students/:id/enroll
exports.enrollInCourse = async (req, res, next) => {
    try {
        const { courseId } = req.body;
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }

        student.enrolledCourses.push({
            course: courseId,
            enrollmentDate: new Date(),
            status: 'active'
        });

        await student.save();
        await student.populate('enrolledCourses.course');

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        next(error);
    }
};
