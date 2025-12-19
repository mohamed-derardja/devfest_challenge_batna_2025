const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const UniversityStaff = require('../models/UniversityStaff');

const signToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'devsecret', {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });

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
        const student = await Student.create({ name, email, password, year, department });
        const token = signToken(student);
        res.status(201).json({ success: true, token, data: { id: student._id, role: student.role, name: student.name, email: student.email } });
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
        const teacher = await Teacher.create({ name, email, password, department, title });
        const token = signToken(teacher);
        res.status(201).json({ success: true, token, data: { id: teacher._id, role: teacher.role, name: teacher.name, email: teacher.email } });
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
        const staff = await UniversityStaff.create({ name, email, password, position });
        const token = signToken(staff);
        res.status(201).json({ success: true, token, data: { id: staff._id, role: staff.role, name: staff.name, email: staff.email } });
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
            const err = new Error('Invalid credentials');
            err.statusCode = 401;
            return next(err);
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            const err = new Error('Invalid credentials');
            err.statusCode = 401;
            return next(err);
        }
        const token = signToken(user);
        res.status(200).json({ success: true, token, data: { id: user._id, role: user.role, name: user.name, email: user.email } });
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
