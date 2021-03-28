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

// --------------------------------------------
// 공지사항 전체 조회
app.get('/ServiceCenter/Notice/', function(request, response){
    console.log('---공지사항 전체 조회---');
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString
    },
    function(err, connection){
        if(err){
            console.log('접속 실패', err);
            console.error(err.message);
            return;
        }
        console.log('접속 성공');
        let query = 'SELECT N_NUM 글번호, N_TITLE 제목, N_NAME 작성자, N_DATE 작성일, N_VIEWS 조회 FROM NOTICE ORDER BY N_NUM DESC';
        connection.execute(query, [], {outFormat:oracledb.OBJECT}, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);   // 데이터
            doRelease(connection, result.rows); // connection 해제
            response.send(result.rows);
        });
    });
    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log('list size:' + rowList.length);
            console.log(rowList);
        });
    }
});
// 디비 연결해제
// --------------------------------------------

// --------------------------------------------
// 공지사항 상세 조회
app.get('/ServiceCenter/NoticeDetail/:N_NUM', function(request, response){
    console.log('---공지사항 조회수 증가---');
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString
    },
    function(err, connection){
        if(err){
            console.log('접속 실패', err);
            console.error(err.message);
            return;
        }
        let query = 'UPDATE NOTICE SET N_VIEWS = N_VIEWS +' + 1 + 'WHERE N_NUM = :N_NUM';
        var binddata = [
            request.param("N_NUM"),
        ]
        connection.execute(query, binddata, {outFormat:oracledb.OBJECT}, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            doRelease(connection, result.rows); // connection 해제
        });
    });
    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
        });
    }
    console.log('---공지사항 상세 조회---');
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString
    },
    function(err, connection){
        if(err){
            console.log('접속 실패', err);
            console.error(err.message);
            return;
        }
        let query = 'SELECT N_NUM 글번호, N_TITLE 제목, N_NAME 작성자, N_DATE 작성일, N_VIEWS 조회, N_CONTENT 내용 FROM NOTICE WHERE N_NUM = :N_NUM';
        var binddata = [
            request.param("N_NUM"),
        ]
        connection.execute(query, binddata, {outFormat:oracledb.OBJECT}, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);   // 데이터
            doRelease(connection, result.rows); // connection 해제
            response.send(result.rows);
        });
    });
    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log(rowList);
        });
    }
});
// 디비 연결해제
// --------------------------------------------

// --------------------------------------------
// 공지사항 수정 조회
app.get('/ServiceCenter/NoticeModify/:N_NUM', function(request, response){
    console.log('---공지사항 수정 조회---');
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString
    },
    function(err, connection){
        if(err){
            console.log('접속 실패', err);
            console.error(err.message);
            return;
        }
        console.log('접속 성공');
        let query = 'SELECT N_NUM 글번호, N_TITLE 제목, N_NAME 작성자, N_DATE 작성일, N_VIEWS 조회, N_CONTENT 내용 FROM NOTICE WHERE N_NUM = :N_NUM';
        var binddata = [
            request.param("N_NUM"),
        ]
        connection.execute(query, binddata, {outFormat:oracledb.OBJECT}, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);   // 데이터
            doRelease(connection, result.rows); // connection 해제
            response.send(result.rows);
        });
    });
    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log('list size:' + rowList.length);
            console.log(rowList);
        });
    }
});
// 디비 연결해제
// --------------------------------------------

// --------------------------------------------
// 공지사항 글작성
router.post('/ServiceCenter/NoticeWriteAction', function(request, response){
    console.log('---공지사항 글작성---');
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString
    },
    function(err, connection){
        if(err){
            console.log('접속 실패', err);
            console.error(err.message);
            return;
        }
        console.log('접속 성공');
        let query = 'INSERT INTO NOTICE(N_NUM, N_TITLE, N_NAME, N_DATE, N_VIEWS, N_CONTENT) VALUES(board_seq.nextval, :N_TITLE, ' + '\'관리자\'' + ', :N_DATE, ' + 0 + ', :N_CONTENT)';
        // PrepareStatement
        var binddata = [
            request.body.N_TITLE,
            request.body.N_DATE,
            request.body.N_CONTENT,
        ]

        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Insert : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/ServiceCenter/Notice');
        });
    });
    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log('list size:' + rowList.length);
            console.log(rowList);
        });
    }
});
// 디비 연결해제
// --------------------------------------------

// --------------------------------------------
// 공지사항 글수정
router.post('/ServiceCenter/NoticeModifyAction', function(request, response){
    console.log('---공지사항 글수정---');
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString
    },
    function(err, connection){
        if(err){
            console.log('접속 실패', err);
            console.error(err.message);
            return;
        }
        console.log('접속 성공');
        let query = 'UPDATE NOTICE SET N_TITLE=:N_TITLE, N_DATE=:N_DATE, N_CONTENT=:N_CONTENT WHERE N_NUM=:N_NUM'
        // PrepareStatement
        var binddata = [
            request.body.N_TITLE,
            request.body.N_DATE,
            request.body.N_CONTENT,
            request.body.N_NUM,
        ]
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Update : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/ServiceCenter/Notice');
        });
    });
    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log(rowList);
        });
    }
});
// 디비 연결해제
// --------------------------------------------

// --------------------------------------------
// 공지사항 글삭제
router.post('/ServiceCenter/NoticeDeleteAction', function(request, response){
    console.log('---공지사항 글삭제---');
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString
    },
    function(err, connection){
        if(err){
            console.log('접속 실패', err);
            console.error(err.message);
            return;
        }
        console.log('접속 성공');
        let query = 'DELETE NOTICE WHERE N_NUM=:N_NUM'
        // PrepareStatement
        var binddata = [
            request.body.N_NUM,
        ]
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Update : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/ServiceCenter/Notice');
        });
    });
    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log(rowList);
        });
    }
});
// 디비 연결해제
// --------------------------------------------

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

