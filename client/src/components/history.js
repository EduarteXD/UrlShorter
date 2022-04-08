import React from 'react'
import LinkCard from './widgets/linkcard'
import { Box, Grid, CircularProgress, Alert, IconButton, Snackbar, Collapse } from '@mui/material'
import { Close } from '@mui/icons-material'

function HistoryPage(hooks)
{
    const [data, setData] = React.useState({})
    const [showMsg, setMsg] = React.useState(0)
    const [rendered, setReady] = React.useState(0)
    const [requestStat, setReq] = React.useState(0)
    const [alertShow, setAlert] = React.useState(1)

    const getHistory = () => {
        fetch('api/recent')
        .then(response => response.json())
        .then(data => {
            if (data.ok === '1')
            {
                setData(data)
                setReady(1)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    if (requestStat === 0)
    {
        setReq(1)
        getHistory()
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMsg(0)
    }

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <Close fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <>
            <Collapse in={alertShow}>
                <Alert 
                    severity="info" 
                    onClose={() => {setAlert(0)}}
                >
                    历史记录最多只会显示最近创建的20个项目
                </Alert>
            </Collapse>
            <Box
                sx={{ 
                    width: '70vw',
                    margin: 'auto', 
                    position: 'absolute',
                    marginTop: '10vh',
                    left: 0,
                    right: 0,
                }}
            >
                <Grid
                    container
                    spacing={4}
                >
                    {
                        rendered ? (
                            <>
                                {
                                    Object.values(data.payload).map((dat, key) => {
                                        return (
                                            <Grid 
                                                item 
                                                xs={12}
                                                sm={3}
                                                key={key}
                                            >
                                                <LinkCard 
                                                    data={dat}
                                                    ChangePage={hooks.ChangePage}
                                                    setMsg={setMsg}
                                                />
                                            </Grid>
                                        )
                                    })
                                }
                            </>
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        margin: 'auto',
                                        left: '33vw'
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            </>
                        )
                    }
                </Grid>
                <Box
                    sx={{
                        width: '100vw',
                        height: '20vh',
                        margin: 'auto'
                    }}
                >
                </Box>
            </Box>
            <Snackbar
                open={showMsg}
                autoHideDuration={3000}
                onClose={handleClose}
                message="已复制链接"
                action={action}
            />
        </>
    )
}

export default HistoryPage