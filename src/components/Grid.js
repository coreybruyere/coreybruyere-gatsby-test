import styled from 'styled-components'
import { Box } from 'rebass'

import {
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridArea,
  alignItems,
  justifyContent,
} from 'styled-system'

export const Grid = styled(Box)(
  {
    display: 'grid',
  },
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  alignItems,
  justifyContent
)

Grid.displayName = 'Grid'

export const Item = styled(Box)(
  {
    display: 'block',
  },
  gridArea,
  gridColumn,
  gridRow
)

Item.defaultProps = 'Item'
