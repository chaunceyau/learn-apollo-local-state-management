import React from 'react'
import { Segment, Divider } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
//
import { CurrencyButtons } from './CurrencyButtons'

export const QUERY_CART_INFO = gql`
  query {
    cart @client {
      items {
        id
        title
        thumbnail_url
        price
      }
      total
    }
    currency @client
  }
`

export function UserCart() {

  const { data } = useQuery(QUERY_CART_INFO)

  return (
    <Segment>
      <h1>My Cart</h1>
      <Divider />
      { data.cart.items.map(item => <p key={item.id}>{item.title}</p>) }
      <h4>Total: { data.currency === 'USD' ? '$' : '€'} { data.cart.total.toFixed(2) } </h4>
      <CurrencyButtons currency={data.currency} />
    </Segment>
  )
}
