import {getProductsReducers} from './Components/redux/reducers/Productreducers'
import {configureStore} from '@reduxjs/toolkit'
const store = configureStore({
    reducer:{
        getproductsdata : getProductsReducers
    }
})
export default store