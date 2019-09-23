import React from 'react'
import { Segment, Card, Divider } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
//
import { Item } from './Item'

export const QUERY_AVAILABLE_ITEMS = gql`
  query {
    itemsForSale @client {
      id
      title
      thumbnail_url
      price
    }
  }
`

// render all items available in our demo store
export function ItemsForPurchase() {
  const { data } = useQuery(QUERY_AVAILABLE_ITEMS)

  return (
    <Segment>
      <h1>Items Available</h1>
      <Divider />
      <Card.Group itemsPerRow={5}>
        { data.itemsForSale.map(item => <Item key={item.id} {...item} /> ) }
      </Card.Group>
    </Segment>
  )
}
