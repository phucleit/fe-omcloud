import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { DataGrid } from '@mui/x-data-grid';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';

const LIST_LOGS = `${config.API_URL}/action-logs`;

export default function ListLogs() {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await axios.get(`${LIST_LOGS}`, {
        params: {
          page: page + 1,
          limit: pageSize
        },
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          token: Cookies.get('token')
        }
      });

      setData(response.data.data);
      setRowCount(response.data.totalLogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'action', headerName: 'Hành động', width: 220 },
    { field: 'object', headerName: 'Tài khoản', width: 220 }
  ];

  return (
    <>
      <MainCard title="Danh sách logs">
        {data.length !== 0 ? (
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row._id}
            paginationMode="server"
            rowCount={rowCount}
            loading={loading}
            pageSize={pageSize}
            page={page}
            onPaginationModelChange={(params) => {
              setPage(params.page);
              setPageSize(params.pageSize);
            }}
            pageSizeOptions={[10, 50, 100]}
            checkboxSelection
          />
        ) : (
          ''
        )}
      </MainCard>
    </>
  );
}
