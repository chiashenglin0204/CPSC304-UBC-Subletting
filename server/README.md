## GET STARTED
run `npm install` in the root directory of the server

## References
[express starter](https://expressjs.com/en/starter/installing.html)

to run
```
// runs on localhost:3000
npm start
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
