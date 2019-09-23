import React, { useState, useEffect } from 'react'
import { Grid, Segment, Container } from 'semantic-ui-react'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { persistCache } from 'apollo-cache-persist'
//
import { ItemsForPurchase } from './components/ItemsForPurchase'
import { UserCart } from './components/UserCart'
import { available_items } from './api'
import { resolvers } from './resolvers'

const cache = new InMemoryCache({})

const client = new ApolloClient({
  cache: cache,
  clientState: {
    defaults: {
      cart: {
        items: [],
        total: 0,
        __typename: 'Cart'
      },
      currency: 'USD',
      itemsForSale: available_items
    },
    resolvers: resolvers
  }
})

async function setupPersistence() {
  try {
    await persistCache({
      cache: cache,
      storage: window.localStorage
    })
  } catch (err) {
    console.log(err)
  }
}

export function App() {
  const [ hydrated, setHydrated ] = useState(false)

  useEffect(() => {
    setupPersistence()
      .finally(() => setHydrated(true))
  }, [])

  if (!hydrated)
    return <p>loading our persisted cache...</p>
    
  return (
    <ApolloProvider client={client}>
      <Container>
        <br />
        <Grid>
          <Grid.Row columns='one'>
            <Grid.Column>
              <Segment>
                <h2>Learning Apollo Local State Management</h2>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns='two'>
            <Grid.Column width='eleven'>
              <ItemsForPurchase />
            </Grid.Column>
            <Grid.Column width='five'>
              <UserCart />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </ApolloProvider>
  )
}
