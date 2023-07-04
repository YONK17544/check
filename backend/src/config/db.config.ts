import mongoose from 'mongoose';

export const dbConnection = async () => {
    const MONGO_URI: string = process.env.MONGO_URI || "mongodb+srv://s4m1kgraj:x6iRgTLslPGsNyTQ@elw.5niciv3.mongodb.net/?retryWrites=true&w=majority";
    const connection: any = await mongoose.connect(MONGO_URI);

    console.log('Mongodb connected', connection.connection.host)
}






