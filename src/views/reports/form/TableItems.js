import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';

function TableItems({ rowsData, deleteTableRows, handleChange, addRow }) {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vật tư, thiết bị</TableCell>
            <TableCell>Đơn vị</TableCell>
            <TableCell>Số lượng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((data, index) => {
            const { name, unit, quantity } = data;
            return (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(event) => handleChange(index, event)}
                    name="name"
                    placeholder="Vật tư, thiết bị"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={unit}
                    onChange={(event) => handleChange(index, event)}
                    name="unit"
                    placeholder="Đơn vị"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={quantity}
                    onChange={(event) => handleChange(index, event)}
                    name="quantity"
                    placeholder="Số lượng"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteTableRows(index)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Button variant="contained" color="primary" onClick={addRow} sx={{ mt: 2 }}>
        Thêm
      </Button>
    </>
  );
}

TableItems.propTypes = {
  rowsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      unit: PropTypes.string,
      quantity: PropTypes.string
    })
  ).isRequired,
  deleteTableRows: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired
};

export default TableItems;
