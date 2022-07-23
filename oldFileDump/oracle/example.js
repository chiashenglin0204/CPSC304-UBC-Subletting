/**
 * 
 * [ARCHIVED] Switching to Postgresql
 * 
 */
const oracledb = require('oracledb');

const mypw = "a43264530"  // set mypw to the hr schema password
const myusr = "ora_kennyc01";
const CREATE_BRANCH_TABLE = "CREATE TABLE branch (branch_id integer PRIMARY KEY, branch_name varchar2(20) not null, branch_addr varchar2(50), branch_city varchar2(20) not null, branch_phone integer)";

async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user          : myusr,
      password      : mypw,  // mypw contains the hr schema password
      connectionString : "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = dbhost.students.cs.ubc.ca)(PORT = 1522))(CONNECT_DATA =(SID= stu)))",
    });

    if (connection != null) console.log("connection success");

    let connection;
    try {
      console.log("trying connection");
      connection = await connection.getConnection();
      console.log("got connection, trying query...");
      result = await connection.execute(CREATE_BRANCH_TABLE);
      console.log("Result is:", result);
    } catch (err) {
      throw (err);
    } finally {
      if (connection) {
        try {
          await connection.close(); // Put the connection back in the pool
        } catch (err) {
          throw (err);
        }
      }
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    await connection.close();
  }
}

run();