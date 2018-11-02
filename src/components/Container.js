import React from 'react'
import { withTheme } from 'styled-components'
import { rem } from 'polished'

import { Grid, Item } from './Grid'

const Container = ({ theme, children }) => {
  return (
    <Grid
      gridTemplateColumns={`1fr minmax(auto, ${rem(
        theme.breakpoints[2]
      )})  minmax(auto, ${rem(theme.maxWidths[1])}) 2fr`}
    >
      <Item gridColumn="2 / span 1">{children}</Item>
    </Grid>
  )
}

export default withTheme(Container)
