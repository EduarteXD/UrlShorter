# 功能
包含一个基本的短链接生成器和历史记录,并可抓取对象网站标题
<details>
	<summary>展开截图</summary>
	<img src="https://user-images.githubusercontent.com/54500106/162447639-fdd7d3a3-a791-4de5-b18d-ea4a45b1c819.png" />
	<img src="https://user-images.githubusercontent.com/54500106/162463349-23949c42-61e1-44aa-a409-4754bbff049a.png" />
</details>

# 下载
运行
```shell
mkdir shortLink
cd shortLink
wget https://github.com/EduarteXD/UrlShorter/releases/download/v1.0.3/server.zip
unzip server.zip
rm -rf server.zip
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
创建并编辑.env文件：
```
vi .env
```
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
npm install forever && forever start server.js
```
运行服务器

# 更新
删除除根目录.env之外所有文件重新下载最新版本即可
