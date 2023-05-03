import styled, { keyframes } from 'styled-components'

interface SpinnerProps {
  width?: string
  height?: string
  borderWidth?: string
  borderColor?: string
  duration?: number
}

const spinnerAnimation = keyframes`
from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const SpinnerBody = styled.div<SpinnerProps>`
  height: ${({ height }) => (height ? height : '4rem')};
  width: ${({ width }) => (width ? width : '4rem')};
  border: ${({ borderWidth }) => (borderWidth ? borderWidth : '4px')} solid;
  border-color: ${({ theme }) => theme.grey[4]};
  border-top-color: ${({ borderColor, theme }) =>
    borderColor ? borderColor : theme.blue[1]};
  border-radius: 50%;
  animation: ${spinnerAnimation}
    ${(p) => (p.duration ? `${p.duration}ms` : '800ms')} linear infinite;
`

export const Loader = (props: SpinnerProps) => {
  return <SpinnerBody {...props} />
}
