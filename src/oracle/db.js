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

//김세엽
//화원 한도신청 리스트
app.get('/AccountLimitList/info', function(request, response){
    console.log('---한도 신청리스트---');
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
        let query = "SELECT m.name as 이름, i.account as 계좌번호, i.Balance as 잔액, l.l_money as 신청금액,l.l_date as 신청날짜 ,l.l_key as 키 "+
                      "FROM members m "+
                      "JOIN ACCOUNT_INFO i ON m.id = i.id "+
                      "JOIN LIMIT_INFO l ON i.account = l.account "+
                      "WHERE l_state='대기' ";
        
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


//김세엽
//한도변경 승인 취소
router.post('/AccountLimitList/update/', function(request, response){
    console.log('---한도변경 승인 취소---');
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

        let query = " UPDATE LIMIT_INFO set l_state=:l_state WHERE l_key=:l_key ";
        
        console.log(request.body.l_state);
        console.log(request.body.l_key);

        var binddata = [
            request.body.l_state,
            request.body.l_key,
        ]
        connection.execute(query,binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);   // 데이터
            doRelease(connection, result.rows); // connection 해제
            response.redirect('#/AccountInfo/AccountLimitList');
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

//김세엽
//회원정보리스트
app.get('/memberInfo', function(request, response){
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
        let query = 'SELECT name 이름, id 아이디, jumin 주민번호 FROM members';
        
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

//김세엽
//회원정보 상세페이지
app.get('/memberDetail/:id', function(request, response){
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
        let query = 'SELECT * FROM members WHERE id=:id';
       
        var binddata = [
            request.param("id")
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

//김세엽
//회원정보수정
router.post('/memberUpdate', function(request, response){
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

        let query = 'UPDATE members set NAME=:NAME, EMAIL=:EMAIL ,  PHONE=:PHONE ,JOB=:JOB, AUTHORITY=:AUTHORITY WHERE ID=:ID';

        var binddata = [
            request.body.NAME,
            request.body.EMAIL,
            request.body.PHONE,
            request.body.JOB,
            request.body.AUTHORITY,
            request.body.ID,
        ]
        connection.execute(query,binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);   // 데이터
            doRelease(connection, result.rows); // connection 해제
            response.redirect('#/memberUpdate/MemberInfo');
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
//========================================================
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
        let query = 'INSERT INTO NOTICE(N_NUM, N_TITLE, N_NAME, N_DATE, N_VIEWS, N_CONTENT) VALUES(num_seq.nextval, :N_TITLE, ' + '\'관리자\'' + ', :N_DATE, ' + 0 + ', :N_CONTENT)';
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
// 고객상담 전체 조회
app.get('/ServiceCenter/Counseling/', function(request, response){
    console.log('---고객상담 전체 조회---');
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
        let query = 'SELECT B_NUM 글번호, B_TITLE 제목, ID 작성자, B_DATE 작성일, B_CATEGORY 분류, B_STATE 답변 FROM COUNSELING ORDER BY B_NUM DESC';
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
// 고객상담 글작성
router.post('/ServiceCenter/CounselingWriteAction', function(request, response){
    console.log('---고객상담 글작성---');
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
        let query = 'INSERT INTO COUNSELING(B_NUM, B_TITLE, ID, B_DATE, B_CONTENT, B_CATEGORY)';
        query += ' VALUES(num_seq.nextval, :B_TITLE, :ID, :B_DATE, :B_CONTENT, :B_CATEGORY)';
        // PrepareStatement
        var binddata = [
            request.body.B_TITLE,
            request.body.ID,
            request.body.B_DATE,
            request.body.B_CONTENT,
            request.body.B_CATEGORY,
        ]

        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Insert : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/ServiceCenter/Counseling');
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
// 고객상담 상세 조회
app.get('/ServiceCenter/CounselingDetail/:B_NUM', function(request, response){
    console.log('---고객상담 상세 조회---');
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
        let query = 'SELECT B_NUM 글번호, B_TITLE 제목, ID 작성자, B_DATE 작성일, B_CONTENT 내용, B_CATEGORY 분류, B_STATE 답변상태, B_NAME 답변자이름, B_ANSWER_DATE 답변날짜, B_ANSWER_CONTENT 답변내용 FROM COUNSELING WHERE B_NUM = :B_NUM';
        var binddata = [
            request.param("B_NUM"),
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
// 고객상담 답변작성
router.post('/ServiceCenter/CounselingCommentAction', function(request, response){
    console.log('---고객상담 답변작성---');
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
        let query = 'UPDATE COUNSELING SET B_STATE=:B_STATE, B_ANSWER_DATE=:B_ANSWER_DATE, B_NAME=:B_NAME, B_ANSWER_CONTENT=:B_ANSWER_CONTENT WHERE B_NUM=:B_NUM';
        // PrepareStatement
        var binddata = [
            request.body.B_STATE,
            request.body.B_ANSWER_DATE,
            request.body.B_NAME,
            request.body.B_ANSWER_CONTENT,
            request.body.B_NUM,
        ]

        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Insert : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/ServiceCenter/Counseling');
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
// 고객상담 수정 조회
app.get('/ServiceCenter/CounselingModify/:B_NUM', function(request, response){
    console.log('---고객상담 수정 조회---');
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
        let query = 'SELECT B_NUM 글번호, B_TITLE 제목, ID 작성자, B_DATE 작성일, B_CONTENT 내용, B_CATEGORY 분류 FROM COUNSELING WHERE B_NUM = :B_NUM';
        var binddata = [
            request.param("B_NUM"), 
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
// 고객상담 글수정
router.post('/ServiceCenter/CounselingModifyAction', function(request, response){
    console.log('---고객상담 글수정---');
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
        let query = 'UPDATE COUNSELING SET B_TITLE=:B_TITLE, B_DATE=:B_DATE, B_CATEGORY=:B_CATEGORY, B_CONTENT=:B_CONTENT WHERE B_NUM=:B_NUM'
        // PrepareStatement
        var binddata = [
            request.body.B_TITLE,
            request.body.B_DATE,
            request.body.B_CATEGORY,
            request.body.B_CONTENT,
            request.body.B_NUM,
        ]
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Update : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/ServiceCenter/Counseling');
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
// 고객상담 글삭제
router.post('/ServiceCenter/CounselingDeleteAction', function(request, response){
    console.log('---고객상담 글삭제---');
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
        let query = 'DELETE COUNSELING WHERE B_NUM=:B_NUM'
        // PrepareStatement
        var binddata = [
            request.body.B_NUM,
        ]
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Update : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/ServiceCenter/Counseling');
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
// 펀드승인리스트 전체 조회
app.get('/Fund/FundList/', function(request, response){
    console.log('---펀드승인리스트 전체 조회---');
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
        let query = 'SELECT F_NUM 펀드번호, F_TITLE 펀드명, (F_START_DATE || ' + '\' ~ \'' + ' || F_END_DATE) 펀딩기간, F_TARGET_MONEY 목표금액, F_CATEGORY 펀드종목 , F_APPROVE 승인여부, F_CONTENT 내용보기 FROM FUND WHERE F_APPROVE = 0 ORDER BY F_NUM DESC';
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
// 펀드승인리스트 상세 조회
app.get('/Fund/FundListDetail/:F_NUM', function(request, response){
    console.log('---펀드승인리스트 상세 조회---');
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString자
    },
    function(err, connection){
        if(err){
            console.log('접속 실패', err);
            console.error(err.message);
            return;
        }
        let query = 'SELECT F_NUM 펀드번호, ID 작성자, F_TITLE 펀드명, F_CONTENT 펀드내용, (F_START_DATE ||  ' + '\' ~ \'' + ' || F_END_DATE) 펀딩기간, F_TARGET_MONEY 목표금액, F_CATEGORY 펀드종목, F_APPROVE 펀드승인, F_NAME 등록자이름, F_PHONE 등록자연락처, F_EMAIL 등록자이메일, ACCOUNT 모금계좌, F_FILENAME 첨부파일 FROM FUND WHERE F_NUM = :F_NUM';
        var binddata = [
            request.param("F_NUM"),
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
// 펀드승인리스트 승인
router.post('/Fund/FundSuccessAction', function(request, response){
    console.log('---펀드승인리스트 승인---');
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
        let query = 'UPDATE FUND SET F_APPROVE = ' + 1 + ' WHERE F_NUM=:F_NUM'
        // PrepareStatement
        var binddata = [
            request.body.F_NUM,
        ]
        console.log(request.body.F_NUM)
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Update : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/Fund/FundList');
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
// 펀드승인리스트 거절
router.post('/Fund/FundFailAction', function(request, response){
    console.log('---펀드승인리스트 거절---');
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
        let query = 'DELETE FUND WHERE F_NUM=:F_NUM'
        // PrepareStatement
        var binddata = [
            request.body.F_NUM,
        ]
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Update : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/Fund/FundList');
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


app.get('/savings/SavingsApproveList', function(request, response){
    console.log('/savings/SavingsApproveList');
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
        let query = "select j.j_name 상품이름, j.j_join_date 적금가입날짜, j.account 계좌번호, j.j_rate 적금금리," 
        + "j.j_method 적금방법, j.j_end_date 적금만기일, a.accountState 계좌상태 from account_info a "
        + "JOIN installment_savings j ON a.account = j.account WHERE accountState = '대기' ";
        
        connection.execute(query,[], {outFormat:oracledb.OBJECT}, function(err, result){
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

router.post('/savings/SavingsApproveList/:update', function(request, response){
    console.log('/savings/SavingsApproveList/:updates');
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
        let query = 'update account_info set ACCOUNTSTATE = :ACCOUNTSTATE where ACCOUNT = :ACCOUNT';
        
        var binddata = [
            request.body.ACCOUNTSTATE,
            request.body.ACCOUNT
        ]
        
        connection.execute(query,binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);   // 데이터
            doRelease(connection, result.rows); // connection 해제
            response.redirect('#/savings/SavingsApproveList/1');
        });
    });
    
    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log('list size:' + rowList);
            console.log(rowList);
        });
    }
});


router.post('/savings/SavingsRegistration', function(request, response){
    console.log('/savings/SavingsRegistration');
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

        let query = "INSERT INTO savings_product VALUES(:J_NAME, :J_SUMMARY, sysdate, :J_INTEREST_RATE, " +
            " :J_TYPE, :J_MAX_DATE, :J_MIN_DATE, :J_EXPLANATION, :J_NOTICE,  :J_AUTO_DATE)";

            console.log(request.body.J_NAME);
            console.log(request.body.J_SUMMARY);
            console.log(request.body.J_INTEREST_RATE);
            console.log(request.body.J_TYPE);
            console.log(request.body.J_MAX_DATE);
            console.log(request.body.J_MIN_DATE);
            console.log(request.body.J_EXPLANATION);
            console.log(request.body.J_NOTICE);
            console.log(request.body.J_AUTO_DATE);
        
        var binddata = [
            request.body.J_NAME,
            request.body.J_SUMMARY,
            request.body.J_INTEREST_RATE,
            request.body.J_TYPE,
            request.body.J_MAX_DATE,
            request.body.J_MIN_DATE,
            request.body.J_EXPLANATION,
            request.body.J_NOTICE,
            request.body.J_AUTO_DATE
        ]
        
        connection.execute(query,binddata, function(err, result){
            console.error(query);
            console.error(binddata);

            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);   // 데이터
            doRelease(connection, result.rows); // connection 해제
            response.redirect('#/savings/SavingsProductList');
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

app.get('/savings/SavingsProductList', function(request, response){
    console.log('/savings/SavingsProductList');
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
        let query = "select j_name 상품명, j_summary 상품요약, TO_CHAR(j_date,'yyyy-mm-dd') 등록일, j_interest_rate 금리, j_type 종류 , j_max_date 최대기간, j_min_date 최소기간 from savings_product";
        
        connection.execute(query,[], {outFormat:oracledb.OBJECT}, function(err, result){
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

app.get('/savings/SavingsModify/:J_NAME', function(request, response){
    console.log('/savings/SavingsModify/:J_NAME');
    console.log(request.params.J_NAME);
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
        let query = "select j_name 상품명, j_summary 상품요약, j_interest_rate 금리, j_type 종류 , j_max_date 최대기간, j_min_date 최소기간, j_explanation 적금설명, j_notice 유의사항, j_auto_date 자동이체날 from savings_product WHERE J_NAME = :J_NAME";
        
        var binddata = [
            request.params.J_NAME,
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

router.post('/savings/SavingsModifyAction', function(request, response){
    console.log('/savings/SavingsModifyAction');
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

        let query = "UPDATE savings_product SET J_SUMMARY =:J_SUMMARY,  J_INTEREST_RATE =:J_INTEREST_RATE, " +
            " J_TYPE =:J_TYPE, J_MAX_DATE =:J_MAX_DATE, J_MIN_DATE =:J_MIN_DATE, J_EXPLANATION =:J_EXPLANATION, J_NOTICE =:J_NOTICE WHERE J_NAME =: J_NAME ";

            
            console.log(request.body.J_SUMMARY);
            console.log(request.body.J_INTEREST_RATE);
            console.log(request.body.J_TYPE);
            console.log(request.body.J_MAX_DATE);
            console.log(request.body.J_MIN_DATE);
            console.log(request.body.J_EXPLANATION);
            console.log(request.body.J_NOTICE);
            console.log(request.body.J_NAME);

        var binddata = [
            request.body.J_SUMMARY,
            request.body.J_INTEREST_RATE,
            request.body.J_TYPE,
            request.body.J_MAX_DATE,
            request.body.J_MIN_DATE,
            request.body.J_EXPLANATION,
            request.body.J_NOTICE,
            request.body.J_NAME
        ]
        
        connection.execute(query,binddata, function(err, result){
            console.error(query);
            console.error(binddata);
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);   // 데이터
            doRelease(connection, result.rows); // connection 해제
            response.redirect('#/savings/SavingsProductList/2');
            
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
        let query = "SELECT l.d_Key 대출번호, i.ID 아이디, l.d_name 대출명, l.account 계좌번호, TO_CHAR(l.d_start_date,'yyyy-mm-dd') 대출실행일, TO_CHAR(l.d_end_date,'yyyy-mm-dd') 대출만기일, l.d_amount 대출금액, l.d_state 대출상태 FROM account_info i, loans l WHERE i.account = l.account ORDER BY l.d_Key DESC";
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

router.post('/savings/SavingsProductList/:J_NAME', function(request, response){
    console.log('/savings/SavingsProductList/:J_NAME');
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
        let query = "UPDATE savings_product SET j_summary='상품판매종료'  WHERE J_NAME =: J_NAME";

        var binddata = [
            request.body.J_NAME,
        ]
        
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row delete : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/savings/SavingsProductList/1');
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
        let query = "SELECT l.d_Key 대출번호, i.ID 아이디, l.d_name 대출명, l.account 계좌번호, TO_CHAR(l.d_start_date,'yyyy-mm-dd') 대출실행일, TO_CHAR(l.d_end_date,'yyyy-mm-dd') 대출만기일, l.d_amount 대출금액, l.d_state 대출상태 FROM account_info i, loans l WHERE i.account = l.account AND D_KEY = :D_KEY";
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
        let query = "SELECT d_name 대출명,d_summary 상품요약 , TO_CHAR(d_date,'yyyy-mm-dd') 대출등록일, d_interest_rate 대출금리, d_min_price 최소대출금액, d_max_price 최대대출금액, d_min_date 최소대출기간, d_max_date 최대대출기간 FROM Loans_product ORDER BY d_date DESC";
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

app.get('/DepositProductList', function(request, response){
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
        let query = 'SELECT Y_NAME 상품명, Y_SUMMARY 상품요약, Y_INTEREST_RATE 금리, Y_TYPE 종류, Y_MIN_DATE 최소기간, Y_MAX_DATE 최대기간, Y_DATE 등록일  FROM deposit_product';
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
        let query = "SELECT d_name 대출명, TO_CHAR(d_date,'yyyy-mm-dd') 대출등록일, d_interest_rate 대출금리, d_summary 대출요약, d_min_price 최소대출금액, d_max_price 최대대출금액, d_min_date 최소대출기간, d_max_date 최대대출기간, d_explanation1 설명1, d_explanation2 설명2, d_explanation3 설명3 FROM Loans_product WHERE D_NAME = :D_NAME";
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
//-------------------------------
// 김소림
// 예금상품수정
app.get('/DepositProductModify/:Y_NAME', function(request, response){
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
        let query = 'SELECT Y_NAME 상품명, Y_SUMMARY 상품요약, Y_INTEREST_RATE 금리, Y_TYPE 종류, Y_MIN_DATE 최소기간, Y_MAX_DATE 최대기간, Y_MIN_PRICE 최소예치금액, Y_EXPLANATION 예금설명, Y_NOTICE 유의사항 FROM deposit_product WHERE Y_NAME=:Y_NAME';
                    console.log('테스틍!',request.param("Y_NAME"));
                    console.log('테스틍!');
                    
        var binddata = [
            request.param("Y_NAME"),
            
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
// --------------------------------------------

// --------------------------------------------
// 박서하
// 대출상품 등록
router.post('/LoansProduct/LoansProductList/LoansProductInsertAction', function(request, response){
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
        let query = 'INSERT INTO Loans_product (d_name, d_date, d_interest_rate, d_summary, d_min_price, d_max_price, d_min_date, d_max_date, d_explanation1, d_explanation2, d_explanation3) VALUES(:D_NAME, :D_DATE, :D_INTEREST_RATE, :D_SUMMARY, :D_MIN_PRICE, :D_MAX_PRICE, :D_MIN_DATE, :D_MAX_DATE, :D_EXPLANATION1, :D_EXPLANATION2, :D_EXPLANATION3)';       
        var binddata = [
            request.body.D_NAME,
            request.body.D_DATE,
            request.body.D_INTEREST_RATE,
            request.body.D_SUMMARY,
            request.body.D_MIN_PRICE,
            request.body.D_MAX_PRICE,
            request.body.D_MIN_DATE,
            request.body.D_MAX_DATE,
            request.body.D_EXPLANATION1,
            request.body.D_EXPLANATION2,
            request.body.D_EXPLANATION3
        ]
        
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Insert' + result.rowsAffected);   // 데이터
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
            console.log('list size:' + rowList.length);
            console.log(rowList);
        });
    }
});
// --------------------------------------------
// 예금상품수정Action
router.post('/AdminDepositProduct/DepositProductModify/DepositProductModifyAction:Y_NAME', function(request, response){
    console.log('---예금 상품 수정---');
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
        let query = 'UPDATE deposit_product SET Y_NAME=:Y_NAME,Y_SUMMARY=:Y_SUMMARY, Y_INTEREST_RATE=:Y_INTEREST_RATE, Y_TYPE=:Y_TYPE, Y_MIN_DATE=:Y_MIN_DATE, Y_MAX_DATE=:Y_MAX_DATE, Y_MIN_PRICE=:Y_MIN_PRICE, Y_EXPLANATION=:Y_EXPLANATION, Y_NOTICE=:Y_NOTICE WHERE Y_NAME=:Y_NAME'
        // PrepareStatement
        var binddata = [
            request.body.Y_NAME,
            request.body.Y_SUMMARY,
            request.body.Y_INTEREST_RATE,
            request.body.Y_TYPE,
            request.body.Y_MIN_DATE,
            request.body.Y_MAX_DATE,
            request.body.Y_MIN_PRICE,
            request.body.Y_EXPLANATION,
            request.body.Y_NOTICE,
        ]
        console.log(request.body.Y_NAME)
        
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Update : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/AdminDepositProduct/DepositProductList');
        });
    });
    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
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

            console.log('list size:' + rowList.length);
        });
    }
});
           
        
            // DB 종료까지 모두 완료되었을시 응답 데이터 반환

        
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
            console.log('list size:' + rowList.length);
            console.log(rowList);
        });
    }
});

// --------------------------------------------
// 예금상품삭제
router.post('/AdminDepositProduct/DepositProductList/:Y_NAME', function(request, response){
    console.log('---예금 상품 삭제---');
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
        let query = "UPDATE deposit_product SET y_summary='상품판매종료' WHERE Y_NAME=:Y_NAME";
        // PrepareStatement
        var binddata = [
            request.body.Y_NAME,
            ]
        console.log(request.body.Y_NAME)
        connection.execute(query, binddata, function(err, result){
            if(err){
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Update : ' + result.rowsAffected);   // 데이터
            doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/AdminDepositProduct/DepositProductList');

        });
    });
    // 디비 연결 해제
    function doRelease(connection, rowList){
        connection.release(function(err, rows){
            if(err){
                console.error(err.message);
            }
            console.log(rowList);
        });
    }
});

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
            console.log('list size:' + rowList.length);
            console.log(rowList);
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
                    " WHERE account =:account ";
                    

                     console.error(request.body.account);
        var binddata = [
            request.body.state,
            request.body.ACC_STATE_CONTENT,
            request.body.account
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
    let query = "UPDATE Loans_product SET d_summary='상품판매종료'  WHERE D_NAME = :D_NAME";
    var binddata = [
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

router.post('/AdminDepositProduct/DepositProductAdd', function(request, response){
    console.log('---예금 상품 등록---');
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
    let query = 'INSERT INTO deposit_product(Y_NAME, Y_SUMMARY, Y_INTEREST_RATE, Y_TYPE, Y_MIN_DATE, Y_MAX_DATE, Y_MIN_PRICE, Y_EXPLANATION, Y_NOTICE)';
    query += ' VALUES(:Y_NAME, :Y_SUMMARY, :Y_INTEREST_RATE, :Y_TYPE, :Y_MIN_DATE, :Y_MAX_DATE, :Y_MIN_PRICE, :Y_EXPLANATION, :Y_NOTICE)';
    // PrepareStatement
    var binddata = [
        request.body.Y_NAME,
        request.body.Y_SUMMARY,
        request.body.Y_INTEREST_RATE,
        request.body.Y_TYPE,
        request.body.Y_MIN_DATE,
        request.body.Y_MAX_DATE,
        request.body.Y_MIN_PRICE,
        request.body.Y_EXPLANATION,
        request.body.Y_NOTICE,
    ]
    console.log(request.body.Y_NAME)
    connection.execute(query, binddata, function(err, result){
        if(err){
            console.error(err.message);
            doRelease(connection);
            return;
        }
        console.log('Row Update : ' + result.rowsAffected);   // 데이터
        doRelease(connection, result.rowsAffected); // connection 해제
            response.redirect('#/AdminDepositProduct/DepositProductList');
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