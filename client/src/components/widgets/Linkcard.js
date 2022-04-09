import React from "react"
import { Card, CardContent, Typography, IconButton, Link, Tooltip } from "@mui/material"
import { Share, Menu, ChevronRight } from "@mui/icons-material"

const LinkCard = (hooks) => {
  const copyLink = () => {
    var textarea = document.createElement("textarea")
    document.body.appendChild(textarea)
    textarea.style.position = "absolute"
    textarea.style.clip = "rect(0 0 0 0)"
    textarea.value = document.URL + hooks.data.name
    textarea.select()
    document.execCommand("copy", true)
    hooks.setMsg(true)
  }

  const goto = () => {
    window.location.replace(document.URL + hooks.data.name)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{hooks.data.title}</Typography>
        <Typography paragraph>
          <Link href={document.URL + hooks.data.name}>
            {hooks.data.to.substring(0, 20)}
            {hooks.data.to.length > 20 ? <>...</> : <></>}
          </Link>
        </Typography>
        <Tooltip title="详细信息">
          <IconButton
            onClick={() => {
              hooks.changePage(2, { ok: "1", dist: hooks.data.name });
            }}
          >
            <Menu />
          </IconButton>
        </Tooltip>
        <Tooltip title="复制链接">
          <IconButton onClick={copyLink}>
            <Share />
          </IconButton>
        </Tooltip>
        <Tooltip title="前往">
          <IconButton onClick={goto}>
            <ChevronRight />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  )
}

export default LinkCard
