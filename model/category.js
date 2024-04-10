import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});


const category = mongoose.model('bcategory', CategorySchema);

export default category;