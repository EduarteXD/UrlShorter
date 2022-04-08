import React from 'react'
import moment from 'moment'
import { Box, Skeleton, Paper, Link, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

function FinishPage(hooks)
{
    const [rendered, setReady] = React.useState(0)
    const [requestStat, setReq] = React.useState(0)
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
                    createTime: data.createTime
                })
                setReady(1)
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

    if (requestStat === 0)
    {
        setReq(1)
        getDetail(hooks.dist)
    }

    return (
        <Box>
            <Paper 
                elevation={3}
                sx={{
                    width: '55vw',
                    height: '10vh',
                    position: 'absolute',
                    margin: 'auto',
                    top: '16vh',
                    left: '0',
                    right: '0',
                }}
            >
                <Box
                    sx={{
                        margin: 'auto',
                        marginTop: '0.2vh',
                        marginLeft: '1vw',
                        padding: '10px 10px 10px 10px'
                    }}
                >
                    <Link 
                        href={document.URL + hooks.dist}
                        sx={{
                            fontSize: '5vh'
                        }}
                    >{document.URL + hooks.dist}</Link>
                </Box>
            </Paper>
            {
                rendered ? (
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
                                        <Typography>详细信息</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            创建时间：{moment(detail.createTime).format('yyyy-MM-DD dd hh:mm a zzz')}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography>统计</Typography>
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

export default FinishPage