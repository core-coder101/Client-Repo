import { Box, MenuItem, OutlinedInput, Select } from '@mui/material'
import React from 'react'

export default function CustomCell({ day }) {

    console.log(day);

  return (
    <Select
    labelId="demo-multiple-chip-label"
    id="demo-multiple-chip"
    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
    required
    >
        <MenuItem>
            TEST
        </MenuItem>
    </Select>
  )
}
