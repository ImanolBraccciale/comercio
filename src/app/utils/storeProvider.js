'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import  {makeStore}  from '../redux/store/store'

export default function StoreProvider({ children }) {

    let store = makeStore()


  return <Provider store={store}>{children}</Provider>
}