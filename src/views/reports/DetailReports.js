import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';
import { apiGet, apiGetById, getCreatedAt } from '../../utils/formatUtils';

const REPORTS = `${config.API_URL}/reports`;
const LIST_PROJECTS = `${config.API_URL}/projects`;
const API = `${config.API_URL}`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function DetailReports() {
  const paramId = useParams();
  const currentId = paramId.id;

  const [code, setCode] = useState('');
  const [dateOfIssue, setDateOfIssue] = useState(new Date());
  const [timesIssued, setTimesIssued] = useState('');
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [registerTestDate, setRegisterTestDate] = useState(new Date());
  const [expiredTestDate, setExpiredTestDate] = useState(new Date());
  const [projectId, setProjectId] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);
  const [level, setLevel] = useState('');
  const [hiconComment, setHiconComment] = useState('');
  const [customerComment, setCustomerComment] = useState('');
  const [status, setStatus] = useState('');

  const [dataProjects, setDataProjects] = useState([]);

  useEffect(() => {
    loadDetailReports();
    loadListProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDetailReports = async () => {
    const result = await apiGetById(`${REPORTS}`, currentId);
    setCode(result.data.code);
    setDateOfIssue(getCreatedAt(result.data.date_of_issue));
    setTimesIssued(result.data.times_issued);
    setName(result.data.name);
    setFrequency(result.data.frequency);
    setRegisterTestDate(getCreatedAt(result.data.register_test_date));
    setExpiredTestDate(getCreatedAt(result.data.expired_test_date));
    setProjectId(result.data.project_id._id);
    setTasks(result.data.tasks);
    setItems(result.data.items);
    setLevel(result.data.level);
    setHiconComment(result.data.hicon_comment);
    setCustomerComment(result.data.customer_comment);
    setStatus(result.data.status);
  };

  const loadListProjects = async () => {
    const result = await apiGet(`${LIST_PROJECTS}`);
    setDataProjects(result.data);
  };

  const columns_tasks = [
    { field: 'name', headerName: 'Thiết bị', width: 300 },
    {
      field: 'image_url',
      headerName: 'Hình ảnh',
      width: 300,
      renderCell: (params) => {
        return <img src={`${API}${params.row.image}`} alt="" />;
      }
    },
    { field: 'description', headerName: 'Mô tả công việc', width: 400 }
  ];

  const columns_items = [
    { field: 'name', headerName: 'Vật tư, Thiết bị', width: 300 },
    { field: 'unit', headerName: 'Đơn vị', width: 300 },
    { field: 'quantity', headerName: 'Số lượng', width: 300 }
  ];

  return (
    <>
      <MainCard title="Chi tiết">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Mã hiệu</InputLabel>
                  <Input
                    id="code"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required={true}
                    placeholder="Nhập mã hiệu..."
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel className="customText">Ngày ban hành</InputLabel>
                  <Input
                    id="date_of_issue"
                    name="date_of_issue"
                    value={dateOfIssue}
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Lần ban hành</InputLabel>
                  <Input
                    id="timesIssued"
                    name="timesIssued"
                    value={timesIssued}
                    onChange={(e) => setTimesIssued(e.target.value)}
                    required={true}
                    placeholder="Nhập lần ban hành..."
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên báo cáo</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên báo cáo..."
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tần suất bảo dưỡng</InputLabel>
                  <Select
                    labelId="frequency"
                    id="frequency"
                    value={frequency}
                    label="Chọn tần suất bảo dưỡng"
                    onChange={(e) => setFrequency(e.target.value)}
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  >
                    <MenuItem value={1}>Hàng tháng</MenuItem>
                    <MenuItem value={2}>Hàng quý</MenuItem>
                    <MenuItem value={3}>Nửa năm</MenuItem>
                    <MenuItem value={4}>Hàng năm</MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên công trình</InputLabel>
                  <Select
                    id="projectId"
                    value={projectId}
                    label="Chọn công trình..."
                    onChange={(e) => setProjectId(e.target.value)}
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  >
                    {dataProjects.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6} className="registeredAt">
              <Item style={{ paddingTop: '4px' }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Ngày kiểm tra</InputLabel>
                </FormControl>
              </Item>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Item style={{ paddingTop: '4px' }}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel className="customText">Từ ngày</InputLabel>
                    </FormControl>
                  </Item>
                  <Item>
                    <FormControl variant="standard" fullWidth>
                      <Input
                        id="register_test_date"
                        name="register_test_date"
                        value={registerTestDate}
                        slotProps={{
                          input: {
                            readOnly: true
                          }
                        }}
                      />
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item style={{ paddingTop: '4px' }}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel className="customText">Đến ngày</InputLabel>
                    </FormControl>
                  </Item>
                  <Item>
                    <FormControl variant="standard" fullWidth>
                      <Input
                        id="expired_test_date"
                        name="expired_test_date"
                        value={expiredTestDate}
                        slotProps={{
                          input: {
                            readOnly: true
                          }
                        }}
                      />
                    </FormControl>
                  </Item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Thông tin bảo trì
                </Typography>
                {tasks.length !== 0 ? <DataGrid rows={tasks} columns={columns_tasks} getRowId={(row) => row._id} pagination={false} /> : ''}
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Tổng hợp vật tư bị thay thế
                </Typography>
                {items.length !== 0 ? <DataGrid rows={items} columns={columns_items} getRowId={(row) => row._id} pagination={false} /> : ''}
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Mức độ hài lòng</InputLabel>
                  <Select
                    labelId="level"
                    id="level"
                    value={level}
                    label="Chọn mức độ hài lòng"
                    onChange={(e) => setLevel(e.target.value)}
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  >
                    <MenuItem value={1}>Không hài lòng</MenuItem>
                    <MenuItem value={2}>Chấp nhận</MenuItem>
                    <MenuItem value={3}>Hài lòng</MenuItem>
                    <MenuItem value={4}>Rất hài lòng</MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Nhận xét của Hicon M-E</InputLabel>
                  <TextField
                    id="hiconComment"
                    name="hiconComment"
                    label="Nhận xét của Hicon M-E"
                    value={hiconComment}
                    onChange={(e) => setHiconComment(e.target.value)}
                    placeholder="Nhập nhận xét của Hicon M-E..."
                    multiline
                    rows={5}
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Nhận xét của khách hàng</InputLabel>
                  <TextField
                    id="customerComment"
                    name="customerComment"
                    label="Nhận xét của khách hàng"
                    value={customerComment}
                    onChange={(e) => setCustomerComment(e.target.value)}
                    placeholder="Nhập nhận xét của khách hàng..."
                    multiline
                    rows={5}
                    slotProps={{
                      input: {
                        readOnly: true
                      }
                    }}
                  />
                </FormControl>
              </Item>
            </Grid>
            {status == 2 ? (
              <Grid item xs={12}>
                <Item>
                  <Button variant="contained" size="medium" onClick="">
                    Xuất báo cáo
                  </Button>
                </Item>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </Box>
      </MainCard>
    </>
  );
}
