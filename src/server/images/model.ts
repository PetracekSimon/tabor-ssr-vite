import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    },
    size: {
        type: String,
    },
    destination: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    folderCode: {
        type: String,
    },
});

export default mongoose.model('Image', imageSchema);
