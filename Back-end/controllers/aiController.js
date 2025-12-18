const Student = require('../models/Student');
const Course = require('../models/Course');
const AIResult = require('../models/AIResult');

// Helper to simulate AI call
const callAIService = async (prompt, data) => {
    // This is where the actual API call to an AI service would go.
    // For now, we simulate a delay and return a mock response.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                plan: "Focus on Algebra this week. Your exam is approaching.",
                summary: "This topic covers linear equations and inequalities."
            });
        }, 500);
    });
};

// @desc    Generate study plan
// @route   POST /api/ai/study-plan
exports.generateStudyPlan = async (req, res, next) => {
    try {
        const { studentId } = req.body;

        if (!studentId) {
            return res.status(400).json({
                success: false,
                error: 'Student ID is required'
            });
        }

        const student = await Student.findById(studentId).populate({
            path: 'enrolledCourses.course',
            populate: { path: 'topics' }
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }

        // Format data for AI
        const aiInput = {
            student: {
                name: student.name,
                year: student.year,
                department: student.department
            },
            courses: student.enrolledCourses.map(enrollment => {
                const course = enrollment.course;
                // Check if course is null (could happen if course was deleted)
                if (!course) return null;

                return {
                    name: course.courseName,
                    topics: course.topics.map(topic => ({
                        name: topic.name,
                        difficulty: topic.difficulty,
                        examDate: topic.examDate
                    }))
                };
            }).filter(c => c !== null) // Remove nulls
        };

        // Call AI Service (Mock)
        const aiResponse = await callAIService("Generate Study Plan", aiInput);

        // Save result (Optional, but good for history)
        // Note: Creating a result might fail if we don't have a specific course ID for the 'course' field in AIResult model.
        // The AIResult model requires 'course', but a study plan might be across multiple courses.
        // For this task, we will just return the JSON as requested.

        res.status(200).json({
            success: true,
            data: {
                inputSentToAI: aiInput,
                aiResponse: aiResponse
            }
        });

    } catch (error) {
        next(error);
    }
};

// @desc    Summarize topic
// @route   POST /api/ai/summarize
exports.summarizeTopic = async (req, res, next) => {
    try {
        const { topicId } = req.body;

        // Find course containing the topic
        const course = await Course.findOne({ 'topics._id': topicId });

        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Topic not found'
            });
        }

        const topic = course.topics.id(topicId);

        // Format data
        const aiInput = {
            topic: topic.name,
            description: topic.description,
            resources: topic.resources
        };

        // Call AI Service
        const aiResponse = await callAIService("Summarize Topic", aiInput);

        res.status(200).json({
            success: true,
            data: {
                topic: topic.name,
                summary: aiResponse.summary
            }
        });

    } catch (error) {
        next(error);
    }
};
