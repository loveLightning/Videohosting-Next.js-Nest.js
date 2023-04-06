import styled, { css } from 'styled-components'

import { Loader } from 'src/components'

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
  color?: 'primary' | 'secondary'
  disabled?: boolean
  rest?: React.CSSProperties
  isLoading?: boolean
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'type' | 'color'>

const COLOR = {
  primary: css`
    color: #fff;
    background-color: ${({ theme }) => theme.blue};
  `,
  secondary: css`
    color: #000;
    background-color: ${({ theme }) => theme.blue};
  `,
}

const DISABLED = css`
  cursor: not-allowed;
  background: ${({ theme }) => theme.grey[2]};
  color: ${({ theme }) => theme.grey[1]};
`

const Container = styled.button<ButtonProps>`
  padding: 15px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  outline: none;
  transition: all 0.2s;
  font-family: ${({ theme }) => theme.roboto500};
  ${({ color }) => color && COLOR[color]}
  ${({ disabled }) => disabled && DISABLED};
`

export const Button = ({
  onClick,
  children,
  color = 'primary',
  disabled,
  isLoading,
  ...rest
}: ButtonProps) => {
  return (
    <Container
      type="submit"
      onClick={onClick}
      color={color}
      disabled={disabled}
      {...rest}>
      {!isLoading ? (
        children
      ) : (
        <WrapLoader>
          <Loader width="1.5rem" height="1.5rem" />
        </WrapLoader>
      )}
    </Container>
  )
}

const WrapLoader = styled.div`
  display: flex;
  justify-content: center;
`
