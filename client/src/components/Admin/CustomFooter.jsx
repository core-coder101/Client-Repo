import { Button } from '@mui/material'
import { GridFooter, GridFooterContainer } from '@mui/x-data-grid'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function CustomFooter({ handleSubmit }) {
  const dispatch = useDispatch()
  return (
    <GridFooterContainer>
      <Button onClick={()=>{dispatch(handleSubmit())}} className='my-3 ms-3' variant="contained" color="primary" style={{borderTop: "none"}}>
          Submit
      </Button>
      <GridFooter />      
    </GridFooterContainer>
  )
}
