import React from 'react'

const Meeting = ({params}:{params:{id:string}}) => {
  return (
    <div>
      you are at the meeting number {params.id}
    </div>
  )
}

export default Meeting
