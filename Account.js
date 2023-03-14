const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/thanh1', {useNewUrlParser: true, useNewUrlParser: true,  useUnifiedTopology: true});
var db = mongoose.connection;
//Bắt sự kiện error
db.on('error', function(err) {
  if (err) console.log(err)
});
//Bắt sự kiện open
db.once('open', function() {
  console.log("Kết nối thành công !");
});

const Schema = mongoose.Schema; 

const account = new Schema({
  username : String,
  password: String
},{
    collection:'account1'
}
);

const AccountModel = mongoose.model('accoubt',account)

module.exports = AccountModel