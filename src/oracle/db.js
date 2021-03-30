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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var router = express.Router();

// 오라클 자동 커밋 설정
oracledb.autoCommit = true;

//-------------------------------
// 회원 계좌정보 조회 (정하늘)
app.get('/userAccList', function(request, response){
    console.log('---회원 계좌정보 조회---');
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


//계좌정보 상세조회 (정하늘)
app.get('/useAcc/:account', function(request, response){
    console.log('---계좌정보 상세조회---');
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
        let query = "SELECT m.id, m.name, m.jumin, m.phone, a.account, a.Balance, a.accountType, a.accountState, a.acc_state_content, a.accountLimit,  to_char(a.delete_Date,'YYYY-MM-DD HH24:MI:SS') DELETE_DATE, to_char(a.sleep_Date,'YYYY-MM-DD HH24:MI:SS') SLEEP_DATE, to_char(a.new_Date,'YYYY-MM-DD HH24:MI:SS') NEW_DATE "+
        'FROM Members m '+ 
        'JOIN account_info a ' +
        'ON m.id = a.id ' +
        'WHERE a.account = :account';

                    
            console.error(request.param("account"));
        var binddata = [
            request.param("account"),
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


//계좌정보 비밀번호 업데이트 (정하늘)
router.post('/AccountInfoAccPwUpdate', function(request, response){
    console.log('---계좌정보 비밀번호 업데이트---');
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
        let query = "UPDATE account_info "+
                       "SET accountPW =:pwChange "+
                     "WHERE account=:account ";

                     console.error(request.body.account);
                     console.error(request.body.pwChange);
        var binddata = [
            request.body.pwChange,
            request.body.account,
        ]

        connection.execute(query,binddata,  function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);   // 데이터
            doRelease(connection, result.rows); // connection 해제
            response.redirect('/#/AccountInfo/AccInfo/'+request.body.account);
        });
    });


    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
        });
    }
});
// 디비 연결해제

//계좌정보 상태 업데이트 (정하늘)
router.post('/AccountInfoAccstateUpdate', function(request, response){
    console.log('---계좌정보 상태 업데이트---');
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
        let query = "UPDATE account_info " +
                    "   SET accountState =:state " +
                    "     , acc_state_content =:ACC_STATE_CONTENT " +
                    " WHERE account ='123123' ";
                    

                     console.error(request.body.account);
        var binddata = [
            request.body.state,
            request.body.ACC_STATE_CONTENT
        ]

        connection.execute(query,binddata,  function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);   // 데이터
            doRelease(connection, result.rows); // connection 해제
            response.redirect('/#/AccountInfo/AccInfo/'+request.body.account+'/'+result.rowsAffected);
        });
    });

    
    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
        });
    }
});
// 디비 연결해제


//계좌거래내역 상세조회 (정하늘)
app.get('/AccountInfoAccountTransferListDetail/:account', function(request, response){
    console.log('---계좌거래내역 상세조회---');
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
        let query = "SELECT day 날짜 "+
        "                   , time 시간 "+
        "                   , money 입출금액 "+
        "                   , balance "+
        "                   , in_comment 받는사람 "+
        "                   , out_comment 보낸사람 "+
        "                   , in_out 내용 "+
        "                   , in_outdate "+
        "                   , balance-summoney 잔액 "+
        "           FROM(SELECT day "+
        "                       , time "+
        "                       , money "+
        "                       , balance "+
        "                       , in_comment "+
        "                       , out_comment "+
        "                       , in_out "+
        "                       , in_outdate  "+
        "                       , SUM(money) OVER(ORDER BY in_outdate DESC) as summoney "+
        "               FROM  (select TO_CHAR(t.in_outdate,'YY-MM-DD') as day "+
        "                           , TO_CHAR(t.in_outdate,'HH24:MI:SS') as time "+
        "                           , t.money,i.balance,t.in_comment "+
        "                           , t.out_comment "+
        "                           , t.in_out "+
        "                           , t.in_outdate "+
        "                       FROM account_info i "+
        "                           LEFT JOIN account_transfer t "+
        "                           ON i.account=t.account "+
        "                       WHERE i.account='77777-777-777' "+
        "                       AND t.in_out='입금' "+
        "                       UNION "+
        "                       select TO_CHAR(t.in_outdate,'YY-MM-DD')as day "+
        "                           , TO_CHAR(t.in_outdate,'HH24:MI:SS')as time "+
        "                           , -t.money,i.balance "+
        "                           , t.in_comment "+
        "                           , t.out_comment "+
        "                           , t.in_out  "+
        "                           , t.in_outdate "+
        "                       FROM account_info i "+
        "                           LEFT JOIN account_transfer t "+
        "                           ON i.account=t.account "+
        "                       WHERE i.account=:account "+
        "                       AND t.in_out='출금')) "
        "                       ORDER BY day DESC "
        "                              , time DESC;";
                        console.log(request.param("account"));
                        
        var binddata = [
            request.param("account"),
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