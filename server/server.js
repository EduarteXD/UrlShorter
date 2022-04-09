import bodyParser from 'body-parser'
import * as cheerio from 'cheerio'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import https from 'https'
import mysql from 'mysql'
import request from 'request'

dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({ extended: 'true' }))
app.use(bodyParser.json({ extended: 'true' }))
app.use(cors())

const base62 = (id) => {
    var arr = '0123456789qwertyuiopasdfghjklzxcvbnmMNBVCXZLKJHGFDSAPOIUYTREWQ'
    var res = ''
    while (id > 0)
    {
        res = arr.substring(id % 62, id % 62 + 1) + res
        id = Math.floor(id / 62)
    }
    return res
}

const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PWD,
    database: process.env.SQL_NAME
})

connection.connect((err) => {
    if (err) {
        console.log('\x1B[31m[Erro] \x1B[0m%s', err.code)
        console.log('[Info] Program will be exit, please check the DB configuration')
        process.exit(0)
    }

    else {
        console.log('[Info] DB Connection Established')
    }
})

app.get('/api/recent', (req, res) => {
    connection.query('select `create`, `title`, `name`, `to` from `linktable` order by `create` desc limit 20', (err, rows) => {
        if (err)
        {
            res.json({ ok: '0' })
            throw err
        }
        res.json({
            ok: '1',
            payload: {
                ...rows
            }
        })
    })
})

app.post('/api/statistics', (req, res) => {
    const queryParams = [req.body.id]
    connection.query('select `clicks` from `linktable` where name = ?', queryParams, (err, rows) => {
        if (err)
        {
            res.json({ ok: '0' })
            throw err
        }
        res.json({
            ok: '1',
            clicks: rows[0].clicks
        })
    })
})

app.post('/api/query', (req, res) => {
    const queryParams = [req.body.id]
    connection.query('select `create`, `title`, `to` from `linktable` where `name` = ?', queryParams, (err, rows) => {
        if (err) 
        {
            res.json({ ok: '0' })
            throw err
        }
        res.json({
            ok: '1',
            title: rows[0].title,
            createTime: rows[0].create,
            to: rows[0].to
        })
    })
})

app.post('/api/create', (req, res) => {
    const queryParams = [req.body.linkTo]
    connection.query('select count(*) from `linktable` where `to` = ?', queryParams, (err, rows) => {
        if (err) 
        {
            res.json({ ok: '0' })
            throw err
        }
        if (rows[0]['count(*)'] === 1)
        {
            connection.query('select `name` from `linktable` where `to` = ?', queryParams, (err, rows) => {
                if (err) 
                {
                    res.json({ ok: '0' })
                    throw err
                }
                res.json({
                    ok: '1',
                    dist: rows[0].name
                })
            })
        }
        else
        {
            connection.query('select count(*) from `linktable`', (err, rows) => {
                if (err)
                {
                    res.json({ ok: '0' })
                    throw err
                }
                var dist = base62(rows[0]['count(*)'] + 1279)
                request({
                    url: req.body.linkTo, 
                    timeout: 3000, 
                    rejectUnauthorized: false, 
                    gzip: true
                }, (err, response, body) => {
                    if (err) 
                    {
                        const insertParams = [dist, req.body.linkTo, '标题抓取失败']
                        connection.query('insert into `linktable` (`name`, `to`, `title`) values (?, ?, ?)', insertParams, (err, rows) => {
                            if (err) 
                            {
                                res.json({ ok: '0' })
                                throw err
                            }
                            res.json({
                                ok: '1',
                                dist: dist
                            })
                        })
                    }
                    else
                    {
                        console.log(body)
                        var content = cheerio.load(body)
                        var title = content('title').html()
                        const insertParams = [dist, req.body.linkTo, title]
                        connection.query('insert into `linktable` (`name`, `to`, `title`) values (?, ?, ?)', insertParams, (err, rows) => {
                            if (err) 
                            {
                                res.json({ ok: '0' })
                                throw err
                            }
                            res.json({
                                ok: '1',
                                dist: dist
                            })
                        })
                    }
                })
            })
        }
    })
})

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(('./public/index.html'))
})

app.get('/:id', (req, res) => {
    const queryParams = [req.params.id]
    connection.query('select `to` from `linktable` where name = ?', queryParams, (err, rows) => {
        if (rows[0])
        {
            connection.query('update `linktable` set `clicks` = `clicks` + 1 where name = ?', queryParams, (err) => {
                res.redirect(rows[0].to)
            })
        }
        else
        {
            res.json({ error: 'Not Found' })
        }
    })
})

app.get('*', (req, res) => {
    res.status(404)
    res.json({ msg: 'Not Found' })
})

app.listen(process.env.APP_PORT, () => {
    console.log('[Info] 服务器在 http://127.0.0.1:%s 启动', process.env.APP_PORT)
});

if (process.env.ENABLE_SSL === 1)
{
    var privateKey = fs.readFileSync('cert/key.pem')
    var certificate = fs.readFileSync('cert/cert.pem')
    var credentials = {key: privateKey, cert: certificate}
    var httpsServer = https.createServer(credentials, app)
    httpsServer.listen(process.env.SSL_PORT)
    console.log('[Info] 服务器在 https://127.0.0.1:%s 启动', process.env.SSL_PORT)
}