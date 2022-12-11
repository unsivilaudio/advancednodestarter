require('../models/User');
import mongoose from 'mongoose';
import keys from '../config/keys';

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

afterAll(async () => {
    await mongoose.disconnect();
});
