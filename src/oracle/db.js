var oracledb = require('oracledb')

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
const { Console } = require('console');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var router = express.Router();

// 오라클 자동 커밋 설정
oracledb.autoCommit = true;

//-------------------------------
// 데이터 조회
app.get('/userAccList', function(request, response){
    console.log('---test_ select---');
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
        let query = 'SELECT m.name 이름, m.jumin 주민번호, a.account 계좌, a.accountstate 계좌상태, a.accounttype 계좌종류, a.balance 잔액 FROM Members m JOIN account_info a ON m.id = a.id';
        
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

app.get('/useAcc/:account', function(request, response){
    console.log('---test2_ select---');
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
        let query = 'SELECT m.name 이름, m.jumin 주민번호, a.account 계좌, a.accountstate 계좌상태, a.accounttype 계좌종류, a.balance 잔액 '+
                    'FROM Members m JOIN account_info a ON m.id = a.id WHERE a.account = :account';
                    console.log('테스틍!',request.account);
                    console.log('테스틍!',request.body.account);
                    console.log('테스틍!');
                    
        var binddata = [
            request.params.account,
        ]
        connection.execute(query,binddata, {outFormat:oracledb.OBJECT}, function(err, result){
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


// 박서하
// 대출 조회
app.get('/Loans/LoanList', function(request, response){
    console.log('---대출 조회---');
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
        let query = 'SELECT l.d_Key 대출번호, i.ID 아이디, l.d_name 대출명, l.account 계좌번호, l.d_start_date 대출실행일, l.d_end_date 대출만기일, l.d_amount 대출금액, l.d_state 대출상태 FROM account_info i, loans l WHERE i.account = l.account ORDER BY l.d_Key DESC';
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
// 박서하
// --------------------------------------------

// --------------------------------------------
// 박서하
// 대출 상세조회
app.get('/Loans/LoanList/LoanDetail/:D_KEY', function(request, response){
    console.log('---대출 상세조회---');
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
        let query = 'SELECT l.d_Key 대출번호, i.ID 아이디, l.d_name 대출명, l.account 계좌번호, l.d_start_date 대출실행일, l.d_end_date 대출만기일, l.d_amount 대출금액, l.d_state 대출상태 FROM account_info i, loans l WHERE i.account = l.account AND D_KEY = :D_KEY';
        var binddata = [
            request.param("D_KEY")
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
// 박서하
// --------------------------------------------

// --------------------------------------------
// 박서하
// 대출 승인
router.post('/Loans/LoanList/LoanAprovalAction', function(request, response){
    console.log('---대출 승인---');
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
        let query = 'UPDATE Loans SET d_state = 1 WHERE D_KEY = :D_KEY';
        var binddata = [
            request.body.D_KEY
        ]

        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Update : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/Loans/LoanList');
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
// 박서하
// --------------------------------------------

// 박서하
// 대출상품 조회
app.get('/LoansProduct/LoansProductList', function(request, response){
    console.log('---대출상품 조회---');
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
        let query = 'SELECT d_name 대출명, d_date 대출등록일, d_interest_rate 대출금리, d_min_price 최소대출금액, d_max_price 최대대출금액, d_min_date 최소대출기간, d_max_date 최대대출기간 FROM Loans_product ORDER BY d_date DESC';
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
// 박서하
// --------------------------------------------

// --------------------------------------------
// 박서하
// 대출상품 상세조회
app.get('/LoansProduct/LoansProductList/LoansProductDetail/:D_NAME', function(request, response){
    console.log('---대출상품 상세조회---');
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
        let query = 'SELECT d_name 대출명, d_date 대출등록일, d_interest_rate 대출금리, d_summary 대출요약, d_min_price 최소대출금액, d_max_price 최대대출금액, d_min_date 최소대출기간, d_max_date 최대대출기간, d_explanation1 설명1, d_explanation2 설명2, d_explanation3 설명3 FROM Loans_product WHERE D_NAME = :D_NAME';
        var binddata = [
            request.param("D_NAME"),
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
// 박서하
// --------------------------------------------

// --------------------------------------------
// 박서하
// 대출상품 등록
app.get('/LoansProduct/LoansProductList/LoansProductInsertAction', function(request, response){
    console.log('---대출상품 등록---');
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
        let query = 'INSERT INTO Loans_product (d_name, d_date, d_interest_rate, d_summary, d_min_price, d_max_price, d_min_date, d_max_date, d_explanation1, d_explanation2, d_explanation3) VALUES(:D_NAME, :D_DATE, :D_INTEREST_RATE, :D_SUMMARY, :D_MIN_PRICE, :D_MAX_PRICE, :D_MIN_PRICE, :D_MAX_DATE, :D_EXPLANATION1, :D_EXPLANATION2, :D_EXPLANATION3)';       
        connection.execute(query, [], {outFormat:oracledb.OBJECT}, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.send(result.rowsAffected);
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
// 박서하
// --------------------------------------------

// --------------------------------------------
// 박서하
// 대출상품 수정
app.get('/LoansProduct/LoansProductList/LoansProductModify/:D_NAME', function(request, response){
    console.log('---대출상품 수정---');
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
        let query = 'SELECT d_name 대출명, d_interest_rate 대출금리, d_summary 대출요약, d_max_price 최대대출금액, d_min_price 최소대출금액, d_max_date 최대대출기간, d_min_date 최소대출기간, d_explanation1 설명1, d_explanation2 설명2, d_explanation3 설명3 FROM Loans_product WHERE D_NAME = :D_NAME';
        var binddata = [
            request.param("D_NAME")
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
// 박서하
// --------------------------------------------

// --------------------------------------------
// 박서하
// 대출상품 수정 실행
router.post('/LoansProduct/LoansProductList/LoansProductModifyAction', function(request, response){
    console.log('---대출상품 수정 실행---');
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
        let query = 'UPDATE Loans_product SET D_INTEREST_RATE = :D_INTEREST_RATE, D_SUMMARY = :D_SUMMARY, D_MIN_PRICE = :D_MIN_PRICE, D_MAX_PRICE = :D_MAX_PRICE, D_MIN_DATE = :D_MIN_DATE, D_MAX_DATE = :D_MAX_DATE, D_EXPLANATION1 = :D_EXPLANATION1, D_EXPLANATION2 = :D_EXPLANATION2, D_EXPLANATION3 = :D_EXPLANATION3 WHERE D_NAME = :D_NAME';
        var binddata = [
            request.body.D_INTEREST_RATE,
            request.body.D_SUMMARY,
            request.body.D_MIN_PRICE,
            request.body.D_MAX_PRICE,
            request.body.D_MIN_DATE,
            request.body.D_MAX_DATE,
            request.body.D_EXPLANATION1,
            request.body.D_EXPLANATION2,
            request.body.D_EXPLANATION3,
            request.body.D_NAME
        ]
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Update : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/LoansProduct/LoansProductList');
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
// 박서하
// --------------------------------------------

// --------------------------------------------
// 박서하
// 대출상품 삭제
router.post('/LoansProduct/LoansProductList/LoansProductDeleteAction', function(request, response){
    console.log('---대출상품 삭제---');
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
        let query = 'DELETE Loans_product WHERE D_NAME = :D_NAME';
        var binddata = [
            request.body.D_KEY
        ]
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Update : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/LoansProduct/LoansProductList');
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
// 박서하
// --------------------------------------------

//========================================================

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