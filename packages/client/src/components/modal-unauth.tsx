import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Modal } from 'src/components'

import { Button } from './button'

interface Props {
  isShowModal: boolean
  setIsShowModal: (val: boolean) => void
}

export const ModalUnauth = ({ isShowModal, setIsShowModal }: Props) => {
  const { push } = useRouter()

  return (
    <>
      {isShowModal && (
        <Modal
          title="Do you want to log in"
          onClose={() => setIsShowModal(false)}
          isShow={isShowModal}
          style={{ width: 400, height: 200 }}>
          <WrapModal>
            <Button onClick={() => push('/auth')}>Sign in</Button>

            <Button color="cart" onClick={() => setIsShowModal(false)}>
              Cancel
            </Button>
          </WrapModal>
        </Modal>
      )}
    </>
  )
}

const WrapModal = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 30px;
`
