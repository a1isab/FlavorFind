import { useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

export default function SearchBar({ initialValue = '', onSearch }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by recipe name..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            bgcolor: 'background.paper',
          },
        }}
      />
    </Box>
  );
}
