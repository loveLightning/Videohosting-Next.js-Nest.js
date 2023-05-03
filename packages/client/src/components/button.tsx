import styled, { css } from 'styled-components'

import { Loader } from 'src/components'

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
  color?: 'primary' | 'secondary' | 'favorites' | 'inactive' | 'cart'
  disabled?: boolean
  rest?: React.CSSProperties
  isLoading?: boolean
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'type' | 'color'>

const COLOR = {
  primary: css`
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.blue[0]};
  `,
  secondary: css`
    color: ${({ theme }) => theme.black};
    background-color: ${({ theme }) => theme.blue[0]};
  `,
  favorites: css`
    color: ${({ theme }) => theme.black};
    background-color: ${({ theme }) => theme.red[0]};
  `,
  cart: css`
    color: ${({ theme }) => theme.red[0]};
    background-color: ${({ theme }) => theme.red[1]};
    transition: 0.4s ease all;
    &:hover {
      background-color: ${({ theme }) => theme.red[2]};
    }
  `,
  inactive: css`
    color: ${({ theme }) => theme.black};
    background-color: ${({ theme }) => theme.white};
  `,
}
const WrapLoader = styled.div`
  display: flex;
  justify-content: center;
`

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
  ${({ color }) => color && COLOR[color] && COLOR[color]};
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
