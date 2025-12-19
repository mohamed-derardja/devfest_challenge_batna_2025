const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const UniversityStaff = require('../models/UniversityStaff');

const signToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'devsecret', {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });

// General registration (simple signup with just name, email, password, role)
exports.registerGeneral = async (req, res, next) => {
    try {
        const { name, email, password, role = 'student' } = req.body;

        if (!name || !email || !password) {
            const err = new Error('Name, email, and password are required');
            err.statusCode = 400;
            return next(err);
        }

        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            const err = new Error('Email already in use');
            err.statusCode = 409;
            return next(err);
        }

        let user;

        // Create user based on role using appropriate model
        if (role === 'teacher') {
            user = await Teacher.create({
                name,
                email,
                password,
                role: 'teacher',
                department: 'General',
                title: 'Professor'
            });
        } else if (role === 'staff') {
            user = await UniversityStaff.create({
                name,
                email,
                password,
                role: 'staff',
                position: 'Staff Member'
            });
        } else {
            // Default to student
            user = await Student.create({
                name,
                email,
                password,
                role: 'student',
                year: 1, // Default year
                department: 'General' // Default department
            });
        }

        const token = signToken(user);

        res.status(201).json({
            success: true,
            token,
            data: {
                id: user._id,
                role: user.role,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

// Student registration with additional fields
exports.registerStudent = async (req, res, next) => {
    try {
        const { name, email, password, year, department } = req.body;

        if (!name || !email || !password || !year || !department) {
            const err = new Error('name, email, password, year, and department are required');
            err.statusCode = 400;
            return next(err);
        }

        const existing = await User.findOne({ email });
        if (existing) {
            const err = new Error('Email already in use');
            err.statusCode = 409;
            return next(err);
        }

        // Create student
        const user = await Student.create({
            name,
            email,
            password,
            year,
            department,
            role: 'student'
        });

        const token = signToken(user);
        res.status(201).json({
            success: true,
            token,
            data: {
                id: user._id,
                role: user.role,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.registerTeacher = async (req, res, next) => {
    try {
        const { name, email, password, department, title } = req.body;
        if (!name || !email || !password) {
            const err = new Error('name, email and password are required');
            err.statusCode = 400;
            return next(err);
        }
        const existing = await User.findOne({ email });
        if (existing) {
            const err = new Error('Email already in use');
            err.statusCode = 409;
            return next(err);
        }
        const teacher = await Teacher.create({ name, email, password, department, title, role: 'teacher' });
        const token = signToken(teacher);
        res.status(201).json({
            success: true,
            token,
            data: {
                id: teacher._id,
                role: teacher.role,
                name: teacher.name,
                email: teacher.email
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.registerStaff = async (req, res, next) => {
    try {
        const { name, email, password, position } = req.body;
        if (!name || !email || !password) {
            const err = new Error('name, email and password are required');
            err.statusCode = 400;
            return next(err);
        }
        const existing = await User.findOne({ email });
        if (existing) {
            const err = new Error('Email already in use');
            err.statusCode = 409;
            return next(err);
        }
        const staff = await UniversityStaff.create({ name, email, password, position, role: 'staff' });
        const token = signToken(staff);
        res.status(201).json({
            success: true,
            token,
            data: {
                id: staff._id,
                role: staff.role,
                name: staff.name,
                email: staff.email
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const err = new Error('email and password are required');
            err.statusCode = 400;
            return next(err);
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        const token = signToken(user);
        res.status(200).json({
            success: true,
            token,
            data: {
                id: user._id,
                role: user.role,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.me = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, data: req.user });
    } catch (error) {
        next(error);
    }
};
