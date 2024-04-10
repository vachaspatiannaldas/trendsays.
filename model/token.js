import mongoose from 'mongoose';

const TokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});


const token = mongoose.model('btoken', TokenSchema);

export default token;