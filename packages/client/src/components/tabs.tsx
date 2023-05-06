import { useRouter } from 'next/router'
import styled from 'styled-components'

import { ITabs } from './profile'

interface Props {
  tabs: ITabs[]
}

export const Tabs = ({ tabs }: Props) => {
  const { query, replace } = useRouter()

  return (
    <>
      <TabContainer>
        {tabs.map((tab, index) => {
          const isActiveTab = query.profile === tab.query

          return (
            <TabButton
              onClick={() =>
                replace(`/profile/${tab.query}`, undefined, { shallow: true })
              }
              key={index}
              active={isActiveTab}>
              <Title active={isActiveTab}>{tab.title}</Title>
              <Indicator active={isActiveTab} />
            </TabButton>
          )
        })}
      </TabContainer>
    </>
  )
}

const TabContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
`

interface Styled {
  active: boolean
}

const TabButton = styled.button<Styled>`
  width: 100%;
  height: 100%;
  padding: 10px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: 0.6s;
  background: ${(props) => (props.active ? '#d1e0e0' : '#f2f2f2')};
  &:focus {
    outline: none;
  }
`
const Title = styled.span<Styled>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  text-transform: uppercase;
  font-size: 20px;
  color: ${(props) => (props.active ? '#3e5b5b' : '#333')};
  transition: 0.6s;
`
const Indicator = styled.span<Styled>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => (props.active ? '#3e5b5b' : '#f1f1f1')};
  transition: 0.6s;
`
