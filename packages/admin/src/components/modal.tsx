import React, { CSSProperties, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

interface Props {
  isShow: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  style?: CSSProperties
}

export const Modal = ({ onClose, children, title, ...style }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)

  const handleCloseClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault()
    onClose()
  }

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const modalContent = (
    <StyledModalOverlay onClick={() => onClose()}>
      <StyledModalWrapper {...style} onClick={(e) => e.stopPropagation()}>
        <StyledModal>
          <StyledModalHeader>
            <div onClick={(e) => handleCloseClick(e)}>&times;</div>
          </StyledModalHeader>
          {title && <StyledModalTitle>{title}</StyledModalTitle>}
          <StyledModalBody>{children}</StyledModalBody>
        </StyledModal>
      </StyledModalWrapper>
    </StyledModalOverlay>
  )

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root') as HTMLElement,
    )
  } else {
    return null
  }
}

const StyledModalBody = styled.div`
  padding-top: 10px;
`

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
  cursor: pointer;
`

const StyledModalWrapper = styled.div`
  width: 500px;
  height: 600px;
  position: relative;
`

const StyledModal = styled.div`
  background: ${({ theme }) => theme.white};
  height: 100%;
  width: 100%;
  border-radius: 15px;
  padding: 15px;
`

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`

const StyledModalTitle = styled.p`
  text-align: center;
  font-size: 20px;
  font-family: ${({ theme }) => theme.roboto500};
`
