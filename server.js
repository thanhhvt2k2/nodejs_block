const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const AccountModel = require('./Account')
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/congkhai',express.static(path.join(__dirname, '/publics'))) //folder nào đc static mới được xem

app.get('/', function (req, res) {
  //__dirname là 1 biến toàn cục chứa đường dẫn  đầy đủ của thư mục hiện tại của tệp đang thực thi __dirname khi này trỏ đến thư mục nodejs
  var duongDanFile = path.join(__dirname,'home.html') //path.join chỉ đến đường dẫn đó ví dụ ở đây là chỉ đến home.html
  res.sendFile(duongDanFile)
})

app.get('/user',(req,res,next)=>{
  // phân mỗi trang là 3 phần tử 
  var page = req.query.page 
  //Ví dụ, trong URL https://example.com/products?category=books&page=2  Express sẽ tạo ra đối tượng req.query chứa thông tin về các tham số này,
  // với cặp giá trị tương ứng là { category: 'books', page: '2' }.
  const page_size = 2
  if(page) {
        //get page
           page = parseInt(page)
           var soLuongBoQua = (page-1)* page_size //ví dụ page=4  skip 6 phần tử 
        AccountModel.find({})
        .skip(soLuongBoQua) // bỏ qua bao nhiêu phần tử 
        .limit(page_size)   // lấy tối đa 3 phần tử sau khi skip
        .then(data=>{
          res.json(data)
        })
        .catch(err=>{
          res.status(500).json("loi server")
        })
  } 
  else {
    AccountModel.find({})
    .then(data=>{
      res.json(data)
    })
    .catch(err=>{
      res.status(500).json("loi server")
    })
  }
 
})



app.listen(port, () => {
  console.log(`xample app listening on port at http://localhost:${port}`)})

