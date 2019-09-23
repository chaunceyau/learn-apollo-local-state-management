import React from 'react'
import { Button } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const MUTATION_CONVERT_CURRENCY = gql`
  mutation ($newCurrency: String!) {
    convertCurrency(newCurrency: $newCurrency) @client
  }
`

export function CurrencyButtons(props) {

  const [ convertCurrency ] = useMutation(MUTATION_CONVERT_CURRENCY)

  return (
    <Button.Group fluid>
      <Button
        content='USD'
        icon='usd'
        positive={props.currency === 'USD'}
        onClick={() => convertCurrency({ variables: { newCurrency: 'USD' } })}
      />
      <Button
        content='EUR'
        icon='euro'
        positive={props.currency === 'EUR'}
        onClick={() => convertCurrency({ variables: { newCurrency: 'EUR' } })}
      />
    </Button.Group>
  )
}
