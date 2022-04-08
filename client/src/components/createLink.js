import React from 'react'
import { Box, TextField, Button, LinearProgress, Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

function CreateLink(hooks)
{
    const [loading, changeLoadingStat] = React.useState(false)
    const [error, setError] = React.useState(false)
    
    const submitLink = () => {
        changeLoadingStat(true)
        fetch('api/create/', {
            body: JSON.stringify({ linkTo: document.getElementById('linkTo').value }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            changeLoadingStat(false)
            if (data.ok === '1')
            {
                hooks.ChangePage(2, {ok: '1', dist: data.dist})
            }
            else
            {
                setError(true)
            }
        })
        .catch((error) => {
            console.error(error)
        })
        
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    }

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    )

    return (
        <Box
            component="form"
            sx={{
                width: '100%',
                position: 'absolute',
                margin: 'auto',
                top: '35%',
                textAlign: 'center'
            }}      
            >
            <Box>
                <TextField
                    id="linkTo"
                    label="输入链接"
                    variant="standard"
                    sx={{
                    width: '66%'
                    }} />
            </Box>
            <Box
                sx={{
                    textAlign: 'left',
                    marginLeft: '17%',
                    marginTop: '1vh'
                }}
            >
                {loading && (
                    <LinearProgress 
                        sx={{
                            position: 'absolute',
                            width: '66%',
                            marginTop: '-11px'
                        }}
                    />
                )}
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={submitLink}
                    disabled={loading}
                >
                    提交
                </Button>
            </Box>
            <Snackbar 
                open={error}
                autoHideDuration={3000}
                onClose={handleClose}
                message="创建失败！"
                action={action}
            />
        </Box>
    )
}

export default CreateLink