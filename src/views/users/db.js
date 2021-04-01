var oracledb = require('oracledb')
var dbconfig = require('./dbConfig')    // 경로 주의

// express 기본모듈
var express = require('express');
var http = require('http');
var path = require('path');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 5000);  // 포트 중복 안되게

var bodyParser = require('body-parser');
const dbConfig = require('./dbConfig');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var router = express.Router();

// 오라클 자동 커밋 설정
oracledb.autoCommit = true;


// 디비 연결해제
// --------------------------------------------

// 라우터 객체를 app 객체에 등록
app.use('/', router);

// 등록되지 않은 패스에 대한 페이지 오류 응답
app.all('*', function(req, res){
    res.status(404).send('<h3>ERROR - 페이지를 찾을 수 없습니다.</h3>');
});

// express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express Server listening in port' + app.get('port'));
});

