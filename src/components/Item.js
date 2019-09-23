import React from 'react'
import { Image, Card, Button } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { useMutation, useQuery } from '@apollo/react-hooks'

const MUTATION_ADD_ITEM_TO_CART = gql`
  mutation ($id: String!) {
    addItemToCart(id: $id) @client
  }
`

const QUERY_CURRENT_CURRENCY = gql`
  query {
    currency @client
  }
`

// render an item with some styling
export function Item(props) {
  const [ addItemToCart ] = useMutation(
    MUTATION_ADD_ITEM_TO_CART,
    { variables: { id: props.id } }
  )
  const { data } = useQuery(QUERY_CURRENT_CURRENCY)

  return (
    <Card size='small'>
      <Image src={props.thumbnail_url} style={{ height: 125, objectFit: 'cover' }}/>
      <Card.Content>
        <Card.Header>
          {props.title}
        </Card.Header>
        <Card.Meta>
          {data.currency === 'EUR' ? '€' : '$'} {props.price.toFixed(2)}
        </Card.Meta>
      </Card.Content>
      <Card.Content as={Button} onClick={addItemToCart}>
        Add to Cart
      </Card.Content>
    </Card>
  )
}
