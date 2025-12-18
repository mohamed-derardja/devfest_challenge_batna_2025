const Course = require('../models/Course');

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

// @desc    Get all topics (from all courses)
// @route   GET /api/topics
exports.getAllTopics = async (req, res, next) => {
    try {
        const courses = await Course.find().select('topics courseName _id');
        
        let allTopics = [];
        courses.forEach(course => {
            if (course.topics && course.topics.length > 0) {
                const courseTopics = course.topics.map(topic => ({
                    ...topic.toObject(),
                    courseId: course._id,
                    courseName: course.courseName
                }));
                allTopics = [...allTopics, ...courseTopics];
            }
        });

        res.status(200).json({
            success: true,
            count: allTopics.length,
            data: allTopics
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
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
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
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
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
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

// @desc    Add topic to course
// @route   POST /api/courses/:id/topics
exports.addTopic = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
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

// @desc    Get topics for a specific course
// @route   GET /api/courses/:id/topics
exports.getCourseTopics = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            count: course.topics.length,
            data: course.topics
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update topic in course
// @route   PUT /api/courses/:id/topics/:topicId
exports.updateTopic = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
        }

        const topic = course.topics.id(req.params.topicId);

        if (!topic) {
            return res.status(404).json({
                success: false,
                error: 'Topic not found'
            });
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
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
        }

        course.topics.pull(req.params.topicId);
        await course.save();

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};
