import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import MainCard from 'ui-component/cards/MainCard';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import './styles.css';
import config from '../../config';
import { apiGet, apiPost, getRoles } from '../../utils/formatUtils';

import TableTasks from './form/TableTasks';
import TableItems from './form/TableItems';

const REPORTS = `${config.API_URL}/reports`;
const LIST_PROJECTS = `${config.API_URL}/projects`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddReports() {
  let navigate = useNavigate();

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

  const [code, setCode] = useState('');
  const [dateOfIssue, setDateOfIssue] = useState(new Date());
  const [timesIssued, setTimesIssued] = useState('');
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [registerTestDate, setRegisterTestDate] = useState(new Date());
  const [expiredTestDate, setExpiredTestDate] = useState(new Date());
  const [projectId, setProjectId] = useState([]);
  const [tasks, setTasks] = useState([{ name: '', image: '', description: '' }]);
  const [items, setItems] = useState([{ name: '', unit: '', quantity: '' }]);
  const [level, setLevel] = useState('');
  const [hiconComment, setHiconComment] = useState('');
  const [customerComment, setCustomerComment] = useState('');

  const [dataProjects, setDataProjects] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadListProjects();
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667467eb263fb998b9925d47');
      if (filteredAdd.length > 0) {
        setPermissionAdd(true);
      } else {
        setPermissionAdd(false);
      }
    }
  }, [dataRoles]);

  const loadListRoles = async () => {
    const result = await getRoles();
    setDataRoles(result.data);
  };

  const loadListProjects = async () => {
    const result = await apiGet(`${LIST_PROJECTS}`);
    setDataProjects(result.data);
  };

  const handleChangeTableTasks = (index, event) => {
    // const { name, value } = event.target;
    // const updateTasks = [...tasks];
    // updateTasks[index][name] = value;
    // setTasks(updateTasks);
    const { name, value } = event.target;
    const updatedTasks = [...tasks];

    if (name === 'image' && value instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedTasks[index].image = reader.result;
        setTasks(updatedTasks);
      };
      reader.readAsDataURL(value);
    } else {
      updatedTasks[index][name] = value;
      setTasks(updatedTasks);
    }
  };

  const deleteTableTasks = (index) => {
    const updateTasks = [...tasks];
    updateTasks.splice(index, 1);
    setTasks(updateTasks);
  };

  const addTasks = () => {
    setTasks([...tasks, { name: '', image: '', description: '' }]);
  };

  const handleChangeTableItems = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  const deleteTableItems = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const addItems = () => {
    setItems([...items, { name: '', unit: '', quantity: '' }]);
  };

  const handleAddReports = (e) => {
    e.preventDefault();
    if (code == '') {
      alert('Vui lòng nhập mã hiệu!');
      return;
    }

    if (dateOfIssue == '') {
      alert('Vui lòng nhập ngày ban hành!');
      return;
    }

    if (timesIssued === '') {
      alert('Vui lòng nhập lần ban hành!');
      return;
    } else if (isNaN(timesIssued)) {
      alert('Lần ban hành phải là số!');
    } else if (Number(timesIssued) <= 0) {
      alert('Lần ban hành phải lớn hơn 0!');
    }

    if (name == '') {
      alert('Vui lòng nhập tên báo cáo!');
      return;
    }

    // const formDataReport = new FormData();
    // formDataReport.append('code', code);
    // formDataReport.append('date_of_issue', dateOfIssue);
    // formDataReport.append('times_issued', timesIssued);
    // formDataReport.append('name', name);
    // formDataReport.append('frequency', frequency);
    // formDataReport.append('register_test_date', registerTestDate);
    // formDataReport.append('expired_test_date', expiredTestDate);
    // formDataReport.append('project_id', projectId);
    // formDataReport.append('level', level);
    // formDataReport.append('hicon_comment', hiconComment);
    // formDataReport.append('customer_comment', customerComment);

    // if (tasks.length > 0) {
    //   formDataReport.append('tasks', tasks);
    // }

    // if (items.length > 0) {
    //   formDataReport.append('items', items);
    // }

    const addReports = {
      code: code,
      date_of_issue: dateOfIssue,
      times_issued: timesIssued,
      name: name,
      frequency: frequency,
      register_test_date: registerTestDate,
      expired_test_date: expiredTestDate,
      project_id: projectId,
      tasks: tasks,
      items: items,
      level: level,
      hicon_comment: hiconComment,
      customer_comment: customerComment
    };

    apiPost(`${REPORTS}`, addReports)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/dashboard/reports/list-reports');
        }, 1500);
      })
      .catch((error) => {
        const err = error.response.data;
        alert(err);
      });
  };

  return permissionAdd ? (
    <>
      <MainCard title="Thêm mới">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item style={{ paddingTop: '4px' }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel className="customText">Ngày ban hành</InputLabel>
                </FormControl>
              </Item>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <DateTimePicker locale="vi-VN" onChange={(date) => setDateOfIssue(date)} value={dateOfIssue} />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
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
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
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
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tần suất bảo dưỡng</InputLabel>
                  <Select
                    labelId="frequency"
                    id="frequency"
                    value={frequency}
                    label="Chọn tần suất bảo dưỡng"
                    onChange={(e) => setFrequency(e.target.value)}
                  >
                    <MenuItem value={1}>Hàng tháng</MenuItem>
                    <MenuItem value={2}>Hàng quý</MenuItem>
                    <MenuItem value={3}>Nửa năm</MenuItem>
                    <MenuItem value={4}>Hàng năm</MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên công trình</InputLabel>
                  <Select id="projectId" value={projectId} label="Chọn công trình..." onChange={(e) => setProjectId(e.target.value)}>
                    {dataProjects.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6} className="registeredAt">
              <Item style={{ paddingTop: '4px' }}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Ngày kiểm tra</InputLabel>
                </FormControl>
              </Item>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} md={6}>
                  <Item style={{ paddingTop: '4px' }}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel className="customText">Từ ngày</InputLabel>
                    </FormControl>
                  </Item>
                  <Item>
                    <FormControl variant="standard" fullWidth>
                      <DateTimePicker locale="vi-VN" onChange={(date) => setRegisterTestDate(date)} value={registerTestDate} />
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Item style={{ paddingTop: '4px' }}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel className="customText">Đến ngày</InputLabel>
                    </FormControl>
                  </Item>
                  <Item>
                    <FormControl variant="standard" fullWidth>
                      <DateTimePicker locale="vi-VN" onChange={(date) => setExpiredTestDate(date)} value={expiredTestDate} />
                    </FormControl>
                  </Item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Item style={{ mb: 5 }}>
                <Typography variant="h4">Thông tin bảo trì</Typography>
              </Item>
              <Item>
                <TableTasks rowsData={tasks} deleteTableRows={deleteTableTasks} handleChange={handleChangeTableTasks} addRow={addTasks} />
              </Item>
            </Grid>
            <Grid item xs={12} md={12}>
              <Item style={{ mb: 5 }}>
                <Typography variant="h4">Tổng hợp vật tư bị thay thế</Typography>
              </Item>
              <Item>
                <TableItems rowsData={items} deleteTableRows={deleteTableItems} handleChange={handleChangeTableItems} addRow={addItems} />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Mức độ hài lòng</InputLabel>
                  <Select labelId="level" id="level" value={level} label="Chọn mức độ hài lòng" onChange={(e) => setLevel(e.target.value)}>
                    <MenuItem value={1}>Không hài lòng</MenuItem>
                    <MenuItem value={2}>Chấp nhận</MenuItem>
                    <MenuItem value={3}>Hài lòng</MenuItem>
                    <MenuItem value={4}>Rất hài lòng</MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6}>
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
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
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
                  />
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleAddReports}>
                Thêm mới
              </Button>
            </Item>
          </Grid>
        </Box>
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Thêm thành công!</Alert>
      </Snackbar>
    </>
  ) : (
    <div>Bạn không có quyền truy cập!</div>
  );
}
