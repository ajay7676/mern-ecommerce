import mongoose from 'mongoose';

const connectDB = async () => {
      try {

         const  db = await mongoose.connect(process.env.MONGO_URI);
        //   console.log(`Mongo DB Connected ${db.connection.host}`);
          console.log(`Mongo DB Connected`);
        
      } catch (error) {
          console.log(`MongoDB Error: ${error.message}`);
          process.exit(1);
        
      }

}

export default connectDB;