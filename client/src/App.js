import React from "react"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { Create, History } from "@mui/icons-material"

import "./main.css"

import CreateLinkPage from "./components/CreateLinkPage"
import HistoryPage from "./components/HistoryPage"
import DetailPage from "./components/DetailPage"

const App = () => {
  document.title = "创建短链接"
  const [page, setPage] = React.useState(0)
  const [showAlert, setAlert] = React.useState(true)
  const [dist, setDist] = React.useState("")

  const changePage = (value, dat) => {
    setPage(value)
    setDist(dat.dist)
  }

  /* const MainElem = () => {
    switch (page) {
      case 0:
        return (
          <CreateLinkPage ChangePage={changePage} />
        )
      case 1:
        return (
          <HistoryPage
            ChangePage={changePage}
            // setAlert={setAlert}
            // alertShow={alertShow}
          />
        )
      case 2:
        return ( 
          <DetailPage dist={dist} />
        )
      default:
        break
    }
  }*/

  return (
    <>
      {
        page === 0 &&
          <CreateLinkPage changePage={changePage} />
      }
      {
        page === 1 &&
          <HistoryPage
            changePage={changePage}
            setAlert={setAlert}
            showAlert={showAlert}
          />
      }
      {
        page === 2 &&
          <DetailPage dist={dist} />
      }
      <Paper
        sx={{
          position: "fixed",
          maxWidth: "fit-content",
          margin: "auto",
          left: "0",
          right: "0",
          bottom: "5vh"
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={page}
          onChange={(event, newPage) => {
            setPage(newPage)
          }}
        >
          <BottomNavigationAction label="创建" icon={<Create />} />
          <BottomNavigationAction label="历史" icon={<History />} />
        </BottomNavigation>
      </Paper>
    </>
  )
}

export default App
