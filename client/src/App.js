import React from 'react'
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import { Create, History } from '@mui/icons-material'

import './main.css'

import CreateLink from './components/createLink'
import HistoryPage from './components/history'
import FinishPage from './components/finish'

function App () 
{
  document.title = '创建短链接'
  const [val, setVal] = React.useState(0)
  const [dist, setDist] = React.useState('')

  var page = (value, dat) => {
    setVal(value)
    setDist(dat.dist)
  }

  function MainElem()
  {
    switch (val) {
      case 0:
        return (
          <CreateLink ChangePage={page} />
        )
      case 1:
        return (
          <HistoryPage ChangePage={page} />
        )
      case 2:
        return (
          <FinishPage dist={dist} />
        )
      default:
        break;
    }
  }
  return (
    <>
      <MainElem />
      <Box 
        sx={{ 
          width: '20%', 
          position: 'fixed', 
          margin: 'auto', 
          left: '0',
          right: '0',
          bottom: '5vh' 
        }}
      >
        <BottomNavigation
          showLabels
          value={val}
          onChange={(event, newVal) => {
            setVal(newVal)
          }}
        >
          <BottomNavigationAction label="创建短链接" icon={ <Create /> }/>
          <BottomNavigationAction label="历史创建" icon={ <History /> } />
        </BottomNavigation>
      </Box>
    </>
  )
}

export default App;