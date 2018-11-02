import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'

const Wrapper = styled.section`
  margin: 0 auto;
  max-width: ${props => rem(props.theme.maxWidths[7])};
  padding: 3em 1.5em 2em;
`

const Container = props => {
  return <Wrapper>{props.children}</Wrapper>
}

export default Container
