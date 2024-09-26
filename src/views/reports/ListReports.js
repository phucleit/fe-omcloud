import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { IconEdit } from '@tabler/icons';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';
import { apiGet, apiDelete, getRoles, getCreatedAt } from '../../utils/formatUtils';

const LIST_REPORTS = `${config.API_URL}/reports`;

export default function ListReports() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);
  const [permissionDelete, setPermissionDelete] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadListStatus();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667467eb263fb998b9925d47');
      const filteredDelete = dataRoles.filter((role_delete) => role_delete.function_id === '667467eb263fb998b9925e43');
      if (filteredAdd.length > 0) {
        setPermissionAdd(true);
      } else {
        setPermissionAdd(false);
      }

      if (filteredDelete.length > 0) {
        setPermissionDelete(true);
      } else {
        setPermissionDelete(false);
      }
    }
  }, [dataRoles]);

  const loadListRoles = async () => {
    const result = await getRoles();
    setDataRoles(result.data);
  };

  const loadListStatus = async () => {
    const result = await apiGet(`${LIST_REPORTS}`);
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      apiDelete(`${LIST_REPORTS}/`, id)
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

  const columns = [
    { field: 'code', headerName: 'Mã hiệu', width: 120 },
    { field: 'times_issued', headerName: 'Lần ban hành', width: 150 },
    { field: 'name', headerName: 'Tên báo cáo', width: 300 },
    {
      field: 'project_id',
      headerName: 'Tên công trình',
      width: 300,
      renderCell: (params) => {
        return <span> {params.row.project_id.name}</span>;
      }
    },
    {
      field: 'test_date',
      headerName: 'Ngày kiểm tra',
      width: 270,
      renderCell: (params) => {
        return (
          <span>
            Từ ngày {getCreatedAt(params.row.register_test_date)} <br /> Đến ngày {getCreatedAt(params.row.expired_test_date)}
          </span>
        );
      }
    },
    { field: 'createdAt', headerName: 'Ngày tạo', valueGetter: (params) => getCreatedAt(params.row.createdAt), width: 180 }
  ];

  if (permissionDelete) {
    columns.unshift({
      field: 'action',
      headerName: 'Hành động',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/dashboard/reports/detail-reports/' + params.row._id}>
              <IconEdit />
            </Link>
            {permissionDelete && (
              <DeleteOutline style={{ cursor: 'pointer', color: '#ff6666' }} onClick={() => handleDelete(params.row._id)} />
            )}
          </>
        );
      }
    });
  }

  return (
    <>
      <MainCard
        title="Danh sách báo cáo"
        secondary={
          permissionAdd && (
            <Button variant="contained" component={Link} to="/dashboard/reports/add-reports">
              Thêm mới
            </Button>
          )
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
