const mongoose = require('mongoose');
const Student = require('../models/Student');
const Course = require('../models/Course');

const MAX_ACTIVE_COURSES = parseInt(process.env.MAX_ACTIVE_COURSES || '5', 10);

const httpError = (message, statusCode = 400) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
};

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
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(httpError('Invalid student id', 400));
        }

        const student = await Student.findById(req.params.id).populate('enrolledCourses.course');

        if (!student) {
            return next(httpError('Student not found', 404));
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
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(httpError('Invalid student id', 400));
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return next(httpError('Student not found', 404));
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
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(httpError('Invalid student id', 400));
        }

        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return next(httpError('Student not found', 404));
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

        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(httpError('Invalid student id', 400));
        }

        if (!mongoose.isValidObjectId(courseId)) {
            return next(httpError('Invalid course id', 400));
        }

        const student = await Student.findById(req.params.id);

        if (!student) {
            return next(httpError('Student not found', 404));
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return next(httpError('Course not found', 404));
        }

        const alreadyEnrolled = student.enrolledCourses.some((item) => item.course.toString() === courseId);
        if (alreadyEnrolled) {
            return next(httpError('Student already enrolled in course', 409));
        }

        const activeCount = student.enrolledCourses.filter((item) => item.status === 'active').length;
        if (activeCount >= MAX_ACTIVE_COURSES) {
            return next(httpError(`Student exceeds max active courses (${MAX_ACTIVE_COURSES})`, 400));
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
