const mongoose = require('mongoose');
module.exports = {
    users: [{
        _id: mongoose.Types.ObjectId('5f083c352a7908662c334532'),
        email: 'user@mailinator.com',
        employeeId: 1,
        role: 1,
        isActive: 1,
        opt: 123456,
        firstName: 'user',
        lastName: 'last'
    },
    {
        _id: mongoose.Types.ObjectId('5f083c352a7908662c334535'),
        email: 'inactive@mailinator.com',
        employeeId: 2,
        role: 1,
        isActive: 0,
        opt: 123456
    },
    {
        _id: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        email: 'super@mailinator.com',
        employeeId: 3,
        role: 4,
        isActive: 1,
        firstName: 'Test',
        lastName: 'Admin'
    }]
};
