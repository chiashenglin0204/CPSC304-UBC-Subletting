# API Routes
User Routes
- `GET` - `/users` - get all users
- `POST` - `/users/createUser` - create user
    * body.sid REQUIRED
    * body.userName REQUIRED
    * body.phoneNum REQUIRED
    * body.gender REQUIRED
- `POST` - `/users/updateUser` - update user
    * body.sid REQUIRED 

Subletter Routes
- `GET` - `/subletter/selectApplicationOrListingByName` - select attribute of users from application OR listing based on userName specified (only subletter could do this)
    * body.isApplication REQUIRED 
    * body.selectedName REQUIRED  
    * body.listingid REQUIRED WHEN req.body.isApplication is TRUE

Application Routes
- `GET` - `/application/getApplicationBySid` - get application by sid (only applicant could do this)
    * body.sid REQUIRED 
- `DELETE` - `/application/deleteApplicationById` - delete application by applicationid
    * body.applicantionid REQUIRED  
- `POST` - `/application/createApplication` - create application
    * body.sid REQUIRED 
    * body.listingid REQUIRED  
    * body.applicantid REQUIRED  
    * body.email
    * EXAMPLE BODY
    ```
    {
        "sid": 222,
        "userName": "1",
        "phoneNum": "222",
        "gender": "M",
        "email": "4324@gmail.com"
    }
    ```

Listing Routes
- `GET` - `/listing/countForRoomTypes` - get # listings for each room type
- `GET` - `/listing/minPriceListingByRoomType` - get the cheapest available listing by roomType
    * body.roomType REQUIRED
        


## GET STARTED
run `npm install` in the root directory of the server

## References
[express starter](https://expressjs.com/en/starter/installing.html)

to run
```
// runs on localhost:3001
npm start
```

## Setting up environment variables
1. Create a folder in the root directory of the server folder called `.env`
2. specify any environment variables E.g.
    ```
    PORT=6969
    ```

## Get setup for development
### postgresql
The following setups use the terminal
1. install `homebrew`
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
2. install `postgresql`
    ```
    brew install postgresql
    ```
    ```
    /usr/local/opt/postgres/bin/createuser -s postgres
    ```
3. initialize db
    ```
    initdb -D ~/postgres/data/
    ```
4. start db - postgres server locally on port `5432` from directory specified
    ```
     pg_ctl -D ~/postgres/data -l logfile start
    ```
    stop db
    ```
     pg_ctl -D ~/postgres/data -l logfile stop
    ```
5. start psql with user - user id will be the user named under the home path
    ```
    psql -U <id> postgres
    ```

    ```
    echo $HOME
    # returns -> /Users/kenny.cheng
    # my user id is kenny.cheng
    ```


### psql commands
`\?` - lists all postgres specific actions

`\h` - lists all SQL commands

`\l` - list all existing dbs

`\d` - list all exist tables and views

## Tools
using `express-generator` to generate file skeleton

[env vars](https://stackoverflow.com/questions/22312671/setting-environment-variables-for-node-to-retrieve)

[.env for setting env variables](https://github.com/motdotla/dotenv)

