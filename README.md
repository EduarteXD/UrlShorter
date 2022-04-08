# 下载
运行
```shell
mkdir shortLink
cd shortLink
wget https://github.com/EduarteXD/UrlShorter/releases/download/v1.0.0/release-1.0.0.zip
unzip release-1.0.0.zip
rm -rf release-1.0.0.zip
```
# 安装
## 初始化数据库
```sql
CREATE TABLE `linktable` (
	`name` TEXT NULL DEFAULT NULL,
	`to` TEXT NULL DEFAULT NULL,
	`title` TEXT NULL DEFAULT NULL,
	`create` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	`clicks` INT(10) NULL DEFAULT '0'
)
ENGINE=InnoDB;
```
## 配置环境变量
修改.env文件：
```
# http端口
APP_PORT=80
# 1：开启ssl
ENABLE_SSL=0
# https端口
SSL_PORT=443
# 数据库连接地址
SQL_HOST=127.0.0.1
# 数据库用户
SQL_USER=
# 数据库密码
SQL_PWD=
# 库名
SQL_NAME=
```
如果开启ssl，请将证书存放在```./cert```文件夹中，命名为cert.pem和key.pem

运行
```
screen -S shortlink
node server.js
```
运行服务器
