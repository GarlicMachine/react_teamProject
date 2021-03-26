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
        let query = 'SELECT F_NUM 펀드번호, ID 작성자, F_TITLE 펀드명, F_CONTENT 펀드내용, (F_START_DATE ||  ' + '\' ~ \'' + ' || F_END_DATE) 펀딩기간, F_TARGET_MONEY 목표금액, F_CATEGORY 펀드종목, F_APPROVE 펀드승인, F_NAME 등록자이름, F_PHONE 등록자연락처, F_EMAIL 등록자이메일, F_ACCOUNT 모금계좌, F_FILENAME 첨부파일 FROM FUND WHERE F_NUM = :F_NUM';
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
