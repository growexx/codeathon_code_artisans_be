/**
 * @name user model
 * @author Growexx
 */
const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    firstName: {
        type: String,
        min: 2,
        max: 30,
        // remove all leading and trailing space from field value
        trim: true
    },
    lastName: {
        type: String,
        min: 2,
        max: 30,
        trim: true
    },
    countryCode: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    isActive: {
        type: Number,
        default: 1,
        // 0 = deactive, 1 = active, 2 = suspended
        enum: [0, 1, 2]
    },
    otp: {
        type: Number,
        default: 0
    },
    phoneOtp: {
        type: Number,
        default: 0
    },
    profilePicture: {
        type: String
    },
    resetToken: {
        type: String
    },
    resetExpiryTime: {
        type: Date
    },
    isDelete: {
        type: Number,
        default: 0,
        enum: [0, 1]
    },
    role: {
        type: Number,
        // 1 = User, 4 = admin
        enum: [1, 2, 3, 4]
    },
    requestedCountryCode: {
        type: String
    },
    requestedPhoneNumber: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

schema.path('email').required(true, 'User email cannot be blank');
schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = appMongoose.model('user', schema);
