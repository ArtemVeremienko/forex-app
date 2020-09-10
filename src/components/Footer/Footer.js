import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

export default function Footer() {
  return (
    <Box bgcolor="primary.main" color="common.white" component="footer" display="flex" alignItems="center" justifyContent="center" height="100px">
      <Typography variant="h6">2020 All right reserved</Typography>
    </Box>
  )
}