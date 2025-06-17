import React from 'react'
import {useSelector} from "react-redux"

const Home = () => {

  const product = useSelector(state=>state)
  console.log(product);
  

  return (
    <div>
      
    </div>
  )
}

export default Home
