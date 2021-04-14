module.exports =
{
    user: process.env.MODE_ORACLEDB_USER || "admin",
    password: process.env.MODE_ORACLEDB_PASSWORD || "1q2w3e4r",
    connectString : process.env.MODE_ORACLEDB_CONNECTIONSTRING || "admin.cispvxsijups.ap-northeast-2.rds.amazonaws.com/orcl" 
}