# Old Oracle Notes

## Testing DB Connection
connect to db by putting complete connection address
```
(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = dbhost.students.cs.ubc.ca)(PORT = 1522))(CONNECT_DATA =(SID= stu)))
```
need [oracle instant client](https://www.oracle.com/database/technologies/instant-client/downloads.html) - referenced from [node oracle install manual](https://oracle.github.io/node-oracledb/INSTALL.html#overview)

1. [MacOS] download dmg 
2. double click in finder
3. follow instructions in README.md to mount and run install script
4. inspect terminal to find install location, copy those files to `/usr/local/lib`

```
node example.js
```


## NOTES
```
SQLNET.USE_HTTPS_PROXY=on

connectionString = 
    (DESCRIPTION =
        (ADDRESS =
            (HTTPS_PROXY=remote.students.cs.ubc.ca)(HTTPS_PROXY_PORT=1522)
            (PROTOCOL = TCP)(HOST = dbhost.students.cs.ubc.ca)(PORT = 1522)
        )
        (CONNECT_DATA =
            (SERVER = DEDICATED)
            (SID= stu)
        )
    )
```