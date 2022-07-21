// REF: https://www.oracle.com/database/technologies/appdev/quickstartnodeonprem.html
const oracledb = require('oracledb');
const tunnel = require('tunnel-ssh');
oracledb.initOracleClient(
    {
        configDir: '/etc/oracle-config'
    }
);

const serverHost = 'remote.students.cs.ubc.ca';
const serverSSHPort = 22;
const serverUser = 'kennyc01';
const serverPassword = '';
const dbHost = 'dbhost.students.cs.ubc.ca';
const dbPort = 1522;
const dbpwd = 'a43264530';
const dbuser = 'ora_kennyc01';
const dbName = '@dbhost.students.cs.ubc.ca';

const config = {
    username: serverUser,
    password: serverPassword,
    host: serverHost,
    port: serverSSHPort,
    dstHost: dbHost,
    dstPort: dbPort,
    localHost: '127.0.0.1',
    localPort: dbPort,

}


async function run() {
  let connection;
  let server;
  try {
    server = (config, function (error, server) {
        if (error){
            console.log("SSH connection error: " + error);
        }tunnel
        console.log('SSH successful, attemping db connection')
        connection = oracledb.getConnection(
            {
                user: dbuser,
                password: dbpwd,
                connectionString: 'connectionString',
            },
        ).then((val) => {
            if (val) {
                console.log('connected to db');
                console.log(val);
            }

        })
    });
    // console.log('creating branch table');
    // await connection.execute(`CREATE TABLE branch (branch_id integer PRIMARY KEY, branch_name varchar2(20) not null, branch_addr varchar2(50), branch_city varchar2(20) not null, branch_phone integer)`);
    // console.log('inserting first row');
    // await connection.execute(`INSERT INTO branch VALUES (1,'First Branch','123 Charming Ave','Vancouver',1234567)`);
    // console.log('inserting second row');
    // await connection.execute(`INSERT INTO branch VALUES (2,'Second Branch','123 Coco Ave','Vancouver',1234568)`);
    // console.log('querying rows')
    // await connection.execute(
    //     `SELECT * FROM branch`,
    //     [], {
    //         resultSet: true,
    //     },
    //     function (err, results) {
    //         if (err) throw err;
    //         console.log(results.resultSet.getRow(function(err, row) {
    //             if (err) throw err;
    //             if (row) console.log(row);
    //             results.resultSet.close((err) => {
    //                 if (err) console.error(err.message);
    //             });
    //         }));
    //     }
    // );

    
  } catch (err) {
    console.error(err)
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
}

run()
