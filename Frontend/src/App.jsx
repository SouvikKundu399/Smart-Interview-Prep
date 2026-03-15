import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'


function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
    axios.get('http://localhost:8000/'

    )
      .then(response => {
        console.log(response)
        setData(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <div>
      {data}
    </div>
  )
}

export default App
