import { View, Text } from 'react-native'
import React from 'react'
// import ShopHeader from '../shop/ShopHeader';

type CustomerBasketProps = {
  navigation: any;
}


const CustomerBasket: React.FC<CustomerBasketProps> =  ({ navigation }) => {
  return (
    <View>
      <Text>CustomerBasket</Text>
    </View>
  )
}

export default CustomerBasket