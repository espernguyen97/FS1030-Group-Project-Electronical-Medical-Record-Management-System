import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Search() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={top100Films}
      getOptionLabel={(option) => option.OHIP}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="OHIP Search" variant="outlined" />}
    />
  );
}

// This will eventually to loaded with Data from the DB
const top100Films = [
  { OHIP: '00654a6s5as6d5as6ASDASD654', DOB: 1994 },
  { OHIP: '1654a6s5as6d5as6ASDASD654', DOB: 1972 },
  { OHIP: '2654a6s5as6d5as6ASDASD654', DOB: 1972 },
  { OHIP: '3654a6s5as6d5as6ASDASD654', DOB: 1973 },
  { OHIP: '4654a6s5as6d5as6ASDASD654', DOB: 1975 },
  { OHIP: '5654a6s5as6d5as6ASDASD654', DOB: 1977 },
  { OHIP: '6654a6s5as6d5as6ASDASD654', DOB: 1978 },
  { OHIP: '7654a6s5as6d5as6ASDASD654', DOB: 1970 },
  { OHIP: '8654a6s5as6d5as6ASDASD654', DOB: 1985 },
  { OHIP: '9654a6s5as6d5as6ASDASD654', DOB: 1982 },
  { OHIP: '0654a6s5as6d5as6ASDASD654', DOB: 1970 },
  { OHIP: '11654a6s5as6d5as6ASDASD654', DOB: 1955 },
  { OHIP: '12654a6s5as6d5as6ASDASD654', DOB: 1905 },
  { OHIP: '13654a6s5as6d5as6ASDASD654', DOB: 1912 },
];
