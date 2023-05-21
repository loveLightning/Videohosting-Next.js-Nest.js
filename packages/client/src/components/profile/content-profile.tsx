import { ApiMethods, UsersService } from '@amazon/common/src'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Container, Tabs } from 'src/components'
import { GET_IMAGE_URL } from 'src/constants'
import { useAppSelector, userSelector } from 'src/store'

import { EditingProfile } from './editing-profile'
import { FavoritesProfile } from './favorites-profile'
import { InfoProfile } from './info-profile'
import { OrdersProfile } from './orders-profile'
import { tabsProfile } from './tabs-profile'

export const ContentProfile = () => {
  const {
    user: { user },
  } = useAppSelector(userSelector)
  const { data: profile } = useQuery(
    ['get profile'],
    () => UsersService.getProfile(),
    {
      select: ({ data }) => data,
      enabled: !!user?.isActivated,
    },
  )

  const { query } = useRouter()

  const renderContentTabs = () => {
    if (profile && query) {
      switch (query.profile) {
        case 'orders': {
          return <OrdersProfile />
        }

        case 'favorites': {
          return <FavoritesProfile favorites={profile?.favorites} />
        }

        case 'editing': {
          return <EditingProfile profile={profile} />
        }

        case 'info': {
          return (
            <InfoProfile
              name={profile.name}
              email={profile.email}
              phone={profile.phone}
            />
          )
        }

        default: {
          return null
        }
      }
    }
  }

  return (
    <>
      <Background>
        <BackCatalog replace href="/">
          Back home
        </BackCatalog>
        <NameUser>{profile?.name}</NameUser>
        {profile?.avatarPath && (
          <PhotoProfile
            src={GET_IMAGE_URL(ApiMethods.Users, 'profile', profile.avatarPath)}
            alt="avatar"
            priority
            height={300}
            width={300}
          />
        )}
      </Background>
      <Container>
        {profile && <Tabs tabs={tabsProfile} />}
        {renderContentTabs()}
      </Container>
    </>
  )
}

const Background = styled.div`
  background-color: ${({ theme }) => theme.blue[1]};
  padding: 60px 30px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  position: relative;
`

const BackCatalog = styled(Link)`
  position: absolute;
  top: 30px;
  left: 30px;
  color: ${({ theme }) => theme.white};
  font-size: 20px;
  cursor: pointer;
`

const NameUser = styled.h3`
  font-family: ${({ theme }) => theme.roboto500};
  font-size: 36px;
  color: ${({ theme }) => theme.white};
`

const PhotoProfile = styled(Image)``
