import React from "react"
import LinkCard from "./widgets/Linkcard"
import { Box, Grid, CircularProgress, Alert, IconButton, Snackbar, Collapse } from "@mui/material"
import { Close } from "@mui/icons-material"

const HistoryPage = (hooks) => {
  const [data, setData] = React.useState({})
  const [showMsg, setMsg] = React.useState(false)
  const [readyToRender, setReady] = React.useState(false)
  const [requestStat, setReq] = React.useState(false)

  //----------------------------------------------------
  const [showAlert, setAlert] = React.useState(true)
  //----------------------------------------------------

  const getHistory = () => {
    fetch("api/recent")
      .then((response) => response.json())
      .then((data) => {
        if (data.ok === "1") {
          setData(data)
          setReady(true)
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  if (!requestStat) {
    setReq(true)
    getHistory()
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setMsg(false)
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
  )

  return (
    <>
      <Collapse in={showAlert/*hooks.alertShow*/}>
        <Alert
          severity="info"
          onClose={() => {
            setAlert(false)
            // hooks.setAlert(false)
          }}
        >
          历史记录最多只会显示最近创建的20个项目
        </Alert>
      </Collapse>
      <Box
        sx={{
          width: "70vw",
          margin: "auto",
          position: "absolute",
          marginTop: "10vh",
          left: 0,
          right: 0
        }}
      >
        <Grid container spacing={4}>
          {readyToRender ? (
            <>
              {Object.values(data.payload).map((dat, key) => {
                return (
                  <Grid item xs={12} sm={3} key={key}>
                    <LinkCard
                      data={dat}
                      ChangePage={hooks.ChangePage}
                      setMsg={setMsg}
                    />
                  </Grid>
                );
              })}
            </>
          ) : (
            <>
              <Box
                sx={{
                  position: "absolute",
                  margin: "auto",
                  left: "33vw"
                }}
              >
                <CircularProgress />
              </Box>
            </>
          )}
        </Grid>
        <Box
          sx={{
            width: "100vw",
            height: "20vh",
            margin: "auto"
          }}
        ></Box>
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
