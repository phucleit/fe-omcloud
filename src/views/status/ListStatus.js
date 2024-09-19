import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { IconEdit } from '@tabler/icons';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';
import { apiGet, apiDelete } from '../../utils/formatUtils';

const LIST_STATUS = `${config.API_URL}/status`;

export default function ListStatus() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadListStatus();
  }, []);

  const loadListStatus = async () => {
    const result = await apiGet(`${LIST_STATUS}`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      apiDelete(`${LIST_STATUS}/`, id)
        .then(() => {
          setOpen(true);
          setData(data.filter((item) => item._id !== id));
          setTimeout(() => {
            setOpen(false);
          }, 1100);
        })
        .catch((error) => console.log(error));
    }
  };

  const columns = [{ field: 'name', headerName: 'Tên trạng thái', width: 300 }];

  columns.push({
    field: 'action',
    headerName: 'Hành động',
    width: 120,
    renderCell: (params) => {
      return (
        <>
          <Link to={'/dashboard/status/update-status/' + params.row._id}>
            <IconEdit />
          </Link>
          <DeleteOutline style={{ cursor: 'pointer', color: '#ff6666' }} onClick={() => handleDelete(params.row._id)} />
        </>
      );
    }
  });

  return (
    <>
      <MainCard
        title="Danh sách"
        secondary={
          <Button variant="contained" component={Link} to="/dashboard/status/add-status">
            Thêm mới
          </Button>
        }
      >
        {data.length !== 0 ? (
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20
                }
              }
            }}
            pageSizeOptions={[20]}
            checkboxSelection
          />
        ) : (
          ''
        )}
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Xóa thành công!</Alert>
      </Snackbar>
    </>
  );
}
