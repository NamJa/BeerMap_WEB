const express = require("express")
const router = express.Router();
const fs = require('fs');

router.get('/', function(request, response) {
    fs.readFile('./static/index.html', function(err, data) { // data는 index.html이다
        if (err) {
            response.send('에러')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(data)
            response.end()
        }
    })
});
// router.get('/user/:id', function(req, res) { // 네이버 블로그의 포스트 id값을 받아서 보여주는 역할도 가능
//     console.log(req.params, req.query);
// });
// 일반 router 코드보다 이렇게 뒤에 있어야 한다.

module.exports = router;