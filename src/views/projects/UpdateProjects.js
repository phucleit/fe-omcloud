import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { IconEdit } from '@tabler/icons';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';
import { apiGet, apiGetById, apiUpdate, getRoles, getCreatedAt } from '../../utils/formatUtils';

const PROJECTS = `${config.API_URL}/projects`;
const LIST_USERS = `${config.API_URL}/users`;
const LIST_SERVICES = `${config.API_URL}/services`;
const LIST_PLAN_SERVICES = `${config.API_URL}/plan-services`;
const LIST_STATUS = `${config.API_URL}/status`;
const LIST_MAINTENANCE_PERIOD = `${config.API_URL}/maintenance-period`;
const REPORT_PROJECT = `${config.API_URL}/reports/project`;
const REPORT_STATUS = `${config.API_URL}/reports/status`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateProjects() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionUpdate, setPermissionUpdate] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [representativePhone, setRepresentativePhone] = useState('');
  const [representativeMail, setRepresentativeMail] = useState('');
  const [userId, setUserId] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [servicePlanId, setServicePlanId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [maintenancePeriodId, setMaintenancePeriodId] = useState('');

  const [statusName, setStatusName] = useState('');

  const [listUser, setListUser] = useState([]);
  const [listServices, setListServices] = useState([]);
  const [listPlanServices, setListPlanServices] = useState([]);
  const [listStatus, setListStatus] = useState([]);
  const [listMaintenancePeriod, setListMaintenancePeriod] = useState([]);

  const [listReports, setListReports] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadDetailProjects();
    loadListUsers();
    loadListServices();
    loadListPlanServices();
    loadListStatus();
    loadListMaintenancePeriod();
    loadListReportByID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '667463d04bede188dfb46d7c');

      if (filteredUpdate.length > 0) {
        setPermissionUpdate(true);
      } else {
        setPermissionUpdate(false);
      }
    }
  }, [dataRoles]);

  const loadListRoles = async () => {
    const result = await getRoles();
    setDataRoles(result.data);
  };

  const loadDetailProjects = async () => {
    const result = await apiGetById(`${PROJECTS}`, currentId);
    setName(result.data.name);
    setAddress(result.data.address);
    setRepresentativeName(result.data.representative_name);
    setRepresentativePhone(result.data.representative_phone);
    setRepresentativeMail(result.data.representative_mail);
    setUserId(result.data.user_id);
    setServiceId(result.data.service_id._id);
    setServicePlanId(result.data.service_plan_id._id);
    setStatusId(result.data.status_id._id);
    setMaintenancePeriodId(result.data.maintenance_period_id._id);
  };

  const loadListUsers = async () => {
    const result = await apiGet(`${LIST_USERS}`);
    setListUser(result.data);
  };

  const loadListServices = async () => {
    const result = await apiGet(`${LIST_SERVICES}`);
    setListServices(result.data);
  };

  const loadListPlanServices = async () => {
    const result = await apiGet(`${LIST_PLAN_SERVICES}`);
    setListPlanServices(result.data);
  };

  const loadListStatus = async () => {
    const result = await apiGet(`${LIST_STATUS}`);
    setListStatus(result.data);
  };

  const loadListMaintenancePeriod = async () => {
    const result = await apiGet(`${LIST_MAINTENANCE_PERIOD}`);
    setListMaintenancePeriod(result.data);
  };

  const loadListReportByID = async () => {
    const result = await apiGetById(`${REPORT_PROJECT}`, currentId);
    setListReports(result.data);
  };

  const handleStatusChange = (event) => {
    const selectedStatusId = event.target.value;
    setStatusId(selectedStatusId);

    const selectedStatus = listStatus.find((item) => item._id === selectedStatusId);

    if (selectedStatus) {
      setStatusName(selectedStatus.name);
    }
  };

  const columns = [
    {
      field: 'action',
      headerName: 'Hành động',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/dashboard/reports/detail-reports/' + params.row._id}>
              <IconEdit />
            </Link>
          </>
        );
      }
    },
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

  const handleUserChange = (event, value) => {
    setUserId(
      value.map((option) => ({
        _id: option._id,
        display_name: option.display_name
      }))
    );
  };

  const handleUpdateProjects = (e) => {
    e.preventDefault();
    if (name == '') {
      alert('Vui lòng nhập tên công trình!');
      return;
    }

    if (representativeName == '') {
      alert('Vui lòng nhập họ tên đại diện!');
      return;
    }

    if (representativePhone == '') {
      alert('Vui lòng nhập điện thoại đại diện!');
      return;
    }

    if (representativeMail == '') {
      alert('Vui lòng nhập email đại diện!');
      return;
    }

    if (serviceId == '') {
      alert('Vui lòng chọn dịch vụ!');
      return;
    }

    if (servicePlanId == '') {
      alert('Vui lòng chọn loại dịch vụ!');
      return;
    }

    if (statusId == '') {
      alert('Vui lòng chọn trạng thái!');
      return;
    }

    if (maintenancePeriodId == '') {
      alert('Vui lòng chọn kỳ bảo trì!');
      return;
    }

    const updateProjects = {
      name: name,
      address: address,
      representative_name: representativeName,
      representative_phone: representativePhone,
      representative_mail: representativeMail,
      user_id: userId,
      service_id: serviceId,
      service_plan_id: servicePlanId,
      status_id: statusId,
      maintenance_period_id: maintenancePeriodId
    };

    if (statusName == 'Đã hoàn thành') {
      const status = {
        status: 2
      };

      apiUpdate(`${REPORT_STATUS}`, currentId, status)
        .then(() => {})
        .catch((error) => console.log(error));
    }

    apiUpdate(`${PROJECTS}`, currentId, updateProjects)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/dashboard/projects/list-projects');
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return permissionUpdate ? (
    <>
      <MainCard title="Cập nhật">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên công trình</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên công trình..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Địa điểm</InputLabel>
                  <Input
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required={true}
                    placeholder="Nhập địa điểm..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Họ tên đại diện</InputLabel>
                  <Input
                    id="representativeName"
                    name="representativeName"
                    value={representativeName}
                    onChange={(e) => setRepresentativeName(e.target.value)}
                    required={true}
                    placeholder="Nhập họ tên đại diện..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Điện thoại đại diện</InputLabel>
                  <Input
                    id="representativePhone"
                    name="representativePhone"
                    value={representativePhone}
                    onChange={(e) => setRepresentativePhone(e.target.value)}
                    required={true}
                    placeholder="Nhập điện thoại đại diện..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Email đại diện</InputLabel>
                  <Input
                    id="representativeMail"
                    name="representativeMail"
                    value={representativeMail}
                    onChange={(e) => setRepresentativeMail(e.target.value)}
                    required={true}
                    placeholder="Nhập email đại diện..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <Autocomplete
                    multiple
                    id="userId"
                    name="userId"
                    options={listUser}
                    value={listUser.filter((user) => Array.isArray(userId) && userId.some((user2) => user2._id === user._id))}
                    getOptionLabel={(option) => option.display_name || ''}
                    filterSelectedOptions
                    onChange={handleUserChange}
                    renderInput={(params) => (
                      <TextField variant="standard" {...params} label="Nhân sự phụ trách" placeholder="Nhân sự phụ trách..." />
                    )}
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Dịch vụ cung cấp</InputLabel>
                  <Select id="serviceId" value={serviceId} label="Chọn dịch vụ..." onChange={(e) => setServiceId(e.target.value)}>
                    {listServices.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Loại dịch vụ</InputLabel>
                  <Select
                    id="servicePlanId"
                    value={servicePlanId}
                    label="Chọn loại dịch vụ..."
                    onChange={(e) => setServicePlanId(e.target.value)}
                  >
                    {listPlanServices.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Trạng thái</InputLabel>
                  <Select id="statusId" value={statusId} label="Chọn trạng thái..." onChange={handleStatusChange}>
                    {listStatus.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Kỳ bảo trì</InputLabel>
                  <Select
                    id="maintenancePeriodId"
                    value={maintenancePeriodId}
                    label="Chọn kỳ bảo trì..."
                    onChange={(e) => setMaintenancePeriodId(e.target.value)}
                  >
                    {listMaintenancePeriod.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateProjects}>
                Cập nhật
              </Button>
            </Item>
          </Grid>
        </Box>
      </MainCard>
      <MainCard title="Báo cáo" sx={{ mt: 3 }}>
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {listReports.length !== 0 ? (
                <DataGrid
                  rows={listReports}
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
            </Grid>
          </Grid>
        </Box>
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Cập nhật thành công!</Alert>
      </Snackbar>
    </>
  ) : (
    <div>Bạn không có quyền truy cập!</div>
  );
}
