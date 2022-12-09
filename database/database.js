const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL

exports.connect = () => {
  mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then()
  .catch((error)=>{
      console.log(`Error while connecting db >> ${error.message}`);
      process.exit(0);
  })
}
