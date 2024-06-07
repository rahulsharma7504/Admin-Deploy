import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded() {
  const [value, setValue] = React.useState(1); // Initialize with page 1

  const handleChange = (event, page) => {
    setValue(page);
  };

  console.log(value); // This will log the current page value

  return (
    <Stack spacing={2}>
      <Pagination count={20} variant="outlined" shape="circular"  onChange={handleChange} />
    </Stack>
  );
}