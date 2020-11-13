# sch42_matcha
![](https://img.shields.io/github/repo-size/dindonpingpong/sch42_matcha)
![](https://img.shields.io/github/languages/count/dindonpingpong/sch42_matcha)
![](https://img.shields.io/github/languages/top/dindonpingpong/sch42_matcha)

HI! Matcha - tinder-like web app. Developed by [rkina](https://github.com/Dindonpingpong) and [mgrass](https://github.com/NyaMilk) from school21.

ER diagram
![er-diagram](https://github.com/Dindonpingpong/sch42_matcha/blob/master/er.png)

# Deployment

For this project you need:
* npm
* node js
* react
* postgresql

Install all packages for this project
`sh deploy.sh packages`

Create database, tables 1000 users
`sh deploy.sh psql YOUR_DB_ACCOUNT YOUR_DB_NAME`

Before launch server fill the info in /api/config/default.json

``` json
{
    "port": "5000",
	  "sockPort": "5001",
    "urlDb": "postgres://YOUR_DB_NICKNAME:YOUR_DB_PASS@localhost:5432/YOUR_DB_NAME",
    "salt": "YOUR_SALT_FOR_PSW",
    "email": "YOUR_EMAIL",
    "emailPass": "YOUR_EMAIL_PASS",
    "apiKey": "YOUR_API_KEY_FROM_YANDEX_MAP"
}
```
Launch servers (node js and react)
`sh deploy.sh run`
