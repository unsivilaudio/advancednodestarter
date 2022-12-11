import mongoose from 'mongoose';

const User = mongoose.model('User');

export default function () {
    return new User({}).save();
}
