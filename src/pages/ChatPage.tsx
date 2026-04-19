import React from 'react'
import { useSelector } from 'react-redux'

const ChatPage = () => {
  const user = useSelector((state:any)=>state?.user?.userData)
        console.log(user,'0-----------------user');

  return (
    <div>
      <h1>ChatPage</h1>
          
    </div>
  )
}

export default ChatPage
