#!/bin/sh

case "$1" in
    "packages")
    cd api
    npm i create-react-app express config bcrypt concurrently nodemon pg-promise nodemailer multer node-fetch cors socket.io
    cd ../client
    npm i bootstrap react-router-dom jquery reactstrap font-awesome moment redux react-redux redux-thunk redux-logger react-yandex-maps use-sound socket.io-client react-hook-form deep-clone
    ;;
    "psql")
    psql rkina < api/initDB/init.sql
    psql rkina -tc "SELECT 1 FROM pg_database WHERE datname = 'rkina'" | grep -q 1 | psql rkina -c "CREATE DATABASE rkina"
    psql rkina < api/initDB/createTables.sql
    psql rkina < api/initDB/addUsers.sql
    psql rkina < api/initDB/updateUsers.sql
    ;;
    "run")
    cd api
    npm run dev
    ;;
    *)
    echo "Usage:"
    echo "packages - install npm packages for node js and react"
    echo "psql - deploy database"
    echo "run - run servers"
esac
