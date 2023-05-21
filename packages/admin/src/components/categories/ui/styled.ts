import styled from 'styled-components'

export const Container = styled.div`
  text-decoration: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100px;
  width: 256px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.white};
  padding: 16px;
  transition: background-color 0.4s;

  &:hover {
    background-color: ${({ theme }) => theme.blue[1]};
  }
`
