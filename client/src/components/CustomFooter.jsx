import { Button } from '@mui/material'
import { GridFooterContainer } from '@mui/x-data-grid'
import React from 'react'

export default function CustomFooter() {
  return (
    <GridFooterContainer>
            <Button variant="contained" color="primary" onClick={() => alert('Button clicked!')}>
                Submit
            </Button>
        </GridFooterContainer>
  )
}
