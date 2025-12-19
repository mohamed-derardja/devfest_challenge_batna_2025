const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DevFest Challenge Batna 2025 API',
            version: '1.0.0',
            description: 'API documentation for the student management system',
            contact: {
                name: 'DevFest Batna 2025'
            }
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                Student: {
                    type: 'object',
                    required: ['name', 'email', 'year', 'department'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Auto-generated student ID'
                        },
                        name: {
                            type: 'string',
                            description: 'Student full name'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Student email address (unique)'
                        },
                        year: {
                            type: 'integer',
                            minimum: 1,
                            maximum: 5,
                            description: 'Academic year (1-5)'
                        },
                        department: {
                            type: 'string',
                            description: 'Department name'
                        },
                        enrolledCourses: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    course: {
                                        type: 'string',
                                        description: 'Course ID'
                                    },
                                    enrollmentDate: {
                                        type: 'string',
                                        format: 'date-time'
                                    },
                                    status: {
                                        type: 'string',
                                        enum: ['active', 'completed', 'dropped']
                                    }
                                }
                            }
                        },
                        averageGrade: {
                            type: 'number',
                            minimum: 0,
                            maximum: 20,
                            description: 'Average grade (0-20)'
                        }
                    }
                },
                Course: {
                    type: 'object',
                    required: ['courseName', 'code'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Auto-generated course ID'
                        },
                        courseName: {
                            type: 'string',
                            description: 'Course name'
                        },
                        code: {
                            type: 'string',
                            description: 'Course code (unique, uppercase)'
                        },
                        topics: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string'
                                    },
                                    name: {
                                        type: 'string'
                                    },
                                    difficulty: {
                                        type: 'string',
                                        enum: ['Easy', 'Medium', 'Hard']
                                    },
                                    examDate: {
                                        type: 'string',
                                        format: 'date-time'
                                    },
                                    description: {
                                        type: 'string'
                                    }
                                }
                            }
                        },
                        credits: {
                            type: 'integer',
                            default: 3
                        },
                        semester: {
                            type: 'string',
                            enum: ['Fall', 'Spring', 'Summer']
                        },
                        year: {
                            type: 'integer'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        error: {
                            type: 'string',
                            description: 'Error message'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
