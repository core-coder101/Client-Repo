import { Button } from '@mui/material'
import { GridFooter, GridFooterContainer } from '@mui/x-data-grid'
import React from 'react'

export default function CustomFooter() {
  return (
    <GridFooterContainer>
      <Button className='my-3 ms-3' variant="contained" color="primary" style={{borderTop: "none"}}>
          Submit
      </Button>
      <GridFooter />      
    </GridFooterContainer>
  )
}
