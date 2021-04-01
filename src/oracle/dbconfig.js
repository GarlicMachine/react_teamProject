module.exports =
{
    user: process.env.MODE_ORACLEDB_USER || "teamProject",
    password: process.env.MODE_ORACLEDB_PASSWORD || "tiger",
    connectString : process.env.MODE_ORACLEDB_CONNECTIONSTRING || "192.168.219.123/xe"
}