import { ExpandMore, InfoOutlined, Timeline } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Link, Paper, Skeleton, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

const DetailPage = (hooks) =>
{
    const [readyToRender, setReady] = React.useState(false)
    const [requestStat, setReq] = React.useState(false)
    const [statistics, setStatistics] = React.useState({})
    const [detail, setDetail] = React.useState({})

    const getDetail = (id) => {
        fetch('api/query/', {
            body: JSON.stringify({ id: id }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok === '1')
            {
                setDetail({
                    title: data.title,
                    createTime: data.createTime,
                    to: data.to
                })
                setReady(true)
            }
        })
        .catch((error) => {
            console.log(error)
        })
        fetch('api/statistics/', {
            body: JSON.stringify({ id: id }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok === '1')
            {
                setStatistics({
                    clicks: data.clicks
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    if (!requestStat)
    {
        setReq(true)
        getDetail(hooks.dist)
    }

    return (
        <Box>
            <Paper
                elevation={3}
                sx={{
                    width: '55vw',
                    position: 'absolute',
                    margin: 'auto',
                    top: '16vh',
                    left: '0',
                    right: '0'
                }}
            >
                <Typography>
                    <Link 
                        href={document.URL + hooks.dist}
                            sx={{
                                fontSize: '5vh',
                                padding: '20px 20px 20px 20px'
                            }}
                        >{window.location.host + '/' + hooks.dist}
                    </Link>
                </Typography>
            </Paper>
            {
                readyToRender ? (
                    <>
                        <Box
                            sx={{
                                width: '55vw',
                                margin: 'auto',
                                position: 'absolute',
                                marginTop: '29vh',
                                left: '0',
                                right: '0'
                            }}
                        >
                            <Box id="titleBox">
                                <Typography variant='h4'>
                                    {detail.title}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    paddingTop: '3vh'
                                }}
                            >
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <InfoOutlined />
                                        <Typography>&nbsp;详细信息</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            创建时间：{moment(detail.createTime).format('yyyy-MM-DD dd hh:mm a zzz')}
                                        </Typography>
                                        <Typography>
                                            指向：
                                            <Link href={detail.to}>
                                                {detail.to}
                                            </Link>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Timeline />
                                        <Typography>&nbsp;统计</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            点击数：{statistics.clicks}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <>
                        <Skeleton 
                            variant="rectangular" 
                            width='55vw' 
                            height='60px' 
                            sx={{
                                margin: 'auto',
                                position: 'absolute',
                                marginTop: '29vh',
                                left: '0',
                                right: '0'
                            }}
                        />
                        <Skeleton 
                            variant="rectangular" 
                            width='55vw' 
                            height='120px' 
                            sx={{
                                margin: 'auto',
                                position: 'absolute',
                                marginTop: 'calc(32vh + 50px)',
                                left: '0',
                                right: '0'
                            }}
                        />
                    </>
                )
            }
            
        </Box>
    )
}

export default DetailPage