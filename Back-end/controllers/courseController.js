const mongoose = require('mongoose');
const Course = require('../models/Course');

const httpError = (message, statusCode = 400) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
};

// @desc    Get all courses
// @route   GET /api/courses
exports.getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find();
        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
exports.getCourse = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(httpError('Invalid course id', 400));
        }

        const course = await Course.findById(req.params.id);

        if (!course) {
            return next(httpError('Course not found', 404));
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new course
// @route   POST /api/courses
exports.createCourse = async (req, res, next) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update course
// @route   PUT /api/courses/:id
exports.updateCourse = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(httpError('Invalid course id', 400));
        }

        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!course) {
            return next(httpError('Course not found', 404));
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
exports.deleteCourse = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(httpError('Invalid course id', 400));
        }

        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return next(httpError('Course not found', 404));
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add topic to course
// @route   POST /api/courses/:id/topics
exports.addTopic = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(httpError('Invalid course id', 400));
        }

        const course = await Course.findById(req.params.id);

        if (!course) {
            return next(httpError('Course not found', 404));
        }

        course.topics.push(req.body);
        await course.save();

        res.status(201).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update topic in course
// @route   PUT /api/courses/:id/topics/:topicId
exports.updateTopic = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(httpError('Invalid course id', 400));
        }

        if (!mongoose.isValidObjectId(req.params.topicId)) {
            return next(httpError('Invalid topic id', 400));
        }

        const course = await Course.findById(req.params.id);

        if (!course) {
            return next(httpError('Course not found', 404));
        }

        const topic = course.topics.id(req.params.topicId);

        if (!topic) {
            return next(httpError('Topic not found', 404));
        }

        Object.assign(topic, req.body);
        await course.save();

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete topic from course
// @route   DELETE /api/courses/:id/topics/:topicId
exports.deleteTopic = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(httpError('Invalid course id', 400));
        }

        if (!mongoose.isValidObjectId(req.params.topicId)) {
            return next(httpError('Invalid topic id', 400));
        }

        const course = await Course.findById(req.params.id);

        if (!course) {
            return next(httpError('Course not found', 404));
        }

        const topic = course.topics.id(req.params.topicId);

        if (!topic) {
            return next(httpError('Topic not found', 404));
        }

        topic.deleteOne();
        await course.save();

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};
