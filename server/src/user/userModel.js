import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: false,
        default: ''
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        default: '+'
    },
    adress: {
        type: String,
        required: false,
        default: ''
    },
    thirdname: {
        type: String,
        required: false,
        default: ''
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
});
const User = mongoose.model('User', userSchema);
export default User;