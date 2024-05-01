import mongoose,{ ConnectOptions } from 'mongoose'

const connectDB = (url:any) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
}
mongoose.set('strictQuery', false);
export default connectDB