import { connect } from 'mongoose';

const connectDB = (url) => connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default connectDB;
