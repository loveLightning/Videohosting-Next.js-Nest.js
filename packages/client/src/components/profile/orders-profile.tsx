import { OrdersService } from '@amazon/common/src'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'

import { convertPrice } from 'src/utils'

export const OrdersProfile = () => {
  const { data: orders } = useQuery(
    ['get orders'],
    () => OrdersService.getAll(),
    {
      select: ({ data }) => data,
    },
  )

  return (
    <Wrap>
      <p>My orders</p>

      <ItemOrder>
        <Item>Order number</Item>
        <Item>Status</Item>
        <Item>Date</Item>
        <Item>Price</Item>
        <Item>Description</Item>
      </ItemOrder>

      {orders?.length ? (
        <WrapOrders>
          {orders.map((order) => (
            <ItemOrder key={order.id}>
              <Item>#{order.id}</Item>
              <Item>{order.status}</Item>
              <Item>
                {new Date(order.createdAt).toLocaleDateString('ru-Ru')}
              </Item>
              <Item>{convertPrice(order.total)}</Item>
              <Item>View</Item>
            </ItemOrder>
          ))}
        </WrapOrders>
      ) : (
        <p>Orders are not found</p>
      )}
    </Wrap>
  )
}

const Wrap = styled.div`
  margin: 50px 0;
`

const WrapOrders = styled.div`
  display: flex;
  flex-direction: column;
`

const ItemOrder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Item = styled.span`
  width: 20%;
  font-family: ${({ theme }) => theme.roboto400};
  font-size: 20px;
  background-color: ${({ theme }) => theme.grey[1]};
  padding: 20px;
`
