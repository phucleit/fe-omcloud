import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Painterro from 'painterro';
import { styled } from '@mui/material/styles';

import 'tui-image-editor/dist/tui-image-editor.css';

import placeholder_add_image from '../../../assets/images/placeholder_add_image.png';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1)
}));

function TableTasks({ rowsData, deleteTableRows, handleChange, addRow }) {
  const openImageEditor = (index, image) => {
    Painterro({
      saveHandler: (imageData) => {
        const updatedTasks = [...rowsData];
        updatedTasks[index].image = imageData.asDataURL();
        const imageBlob = imageData.asDataURL();
        handleChange(index, { target: { name: 'image', value: imageBlob } });
      }
    }).show(image ? { src: image } : undefined);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Thiết bị</TableCell>
            <TableCell>Hình ảnh</TableCell>
            <TableCell>Mô tả công việc</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((data, index) => {
            const { name, image, description } = data;
            return (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(event) => handleChange(index, event)}
                    name="name"
                    placeholder="Thiết bị"
                  />
                </TableCell>
                <TableCell>
                  <Div style={{ cursor: 'pointer' }} onClick={() => openImageEditor(index, image)}>
                    <img width={150} height={100} src={image || placeholder_add_image} alt="Hình ảnh" />
                  </Div>
                  {/* <div className={`editor-wrapper-${index}`}>
                    <img
                      style={{ cursor: 'pointer' }}
                      className={`editor-image`}
                      width={150}
                      height={100}
                      src={image || placeholder_add_image}
                      alt="Hình ảnh"
                    />
                  </div> */}
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={(event) => handleChange(index, event)}
                    name="description"
                    placeholder="Mô tả công việc"
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

TableTasks.propTypes = {
  rowsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired,
  deleteTableRows: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired
};

export default TableTasks;
