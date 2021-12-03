#Routes

/api/auth
        /register : Create user, return message | err
        /login : Fetch user in DB, return session token | err
        /logout : Remove user token in DB, return message | err
        /requestpassword : WIP
        /changepassword : WIP
    /oauth
        /github : Auth user with github, return callback to classic auth system | err
        /facebook : Same
