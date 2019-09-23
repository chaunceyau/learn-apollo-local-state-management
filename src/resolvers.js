import { QUERY_CART_INFO } from './components/UserCart'
import { QUERY_AVAILABLE_ITEMS } from './components/ItemsForPurchase'
import { convertPrice } from './util'

export const resolvers = {
  Mutation: {
    addItemToCart: (_, args, { cache }) => {
      const { cart } = cache.readQuery({ query: QUERY_CART_INFO })

      const { itemsForSale } = cache.readQuery({ query: QUERY_AVAILABLE_ITEMS })

      const newItem = itemsForSale.find(item => item.id === args.id)

      cache.writeData({
        data: {
          cart: {
            items: cart.items.concat(newItem),
            total: cart.total + newItem.price,
            __typename: 'Cart'
          }
        }
      })

      return newItem
    },
    async convertCurrency(_, { newCurrency }, { cache }) {
      const { currency, cart: { total } } = cache.readQuery({ query: QUERY_CART_INFO })

      const { itemsForSale } = cache.readQuery({ query: QUERY_AVAILABLE_ITEMS })

      const itemsWithConvertedPricing = await Promise.all(
        itemsForSale.map(async (item) => ({
          ...item,
          price: await convertPrice(currency, newCurrency, item.price)
        })))

      cache.writeData({
        data: {
          itemsForSale: itemsWithConvertedPricing,
          cart: {
            total: await convertPrice(currency, newCurrency, total),
            __typename: 'Cart'
          },
          currency: newCurrency
        }
      })

      return newCurrency
    }
  }
}
