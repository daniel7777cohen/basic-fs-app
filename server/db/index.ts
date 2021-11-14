import mongoose from 'mongoose';

const mongoUri = `mongodb+srv://daniel:a636pzw4@cluster0.zqubz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {});

    console.log('MongoDB Connected...');
  } catch (error) {
    console.log(error.message);
    process.exit(1); // Exit process with failure
  }
};
