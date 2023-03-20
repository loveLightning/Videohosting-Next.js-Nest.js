import styled from 'styled-components'

const Line = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.grey[2]};
  width: 100%;
`

export const Separator = () => {
  return <Line />
}
