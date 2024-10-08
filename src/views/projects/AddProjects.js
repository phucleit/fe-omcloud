import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

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

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';
import { apiGet, apiPost, getRoles } from '../../utils/formatUtils';

const PROJECTS = `${config.API_URL}/projects`;
const LIST_USERS = `${config.API_URL}/users`;
const LIST_SERVICES = `${config.API_URL}/services`;
const LIST_PLAN_SERVICES = `${config.API_URL}/plan-services`;
const LIST_STATUS = `${config.API_URL}/status`;
const LIST_MAINTENANCE_PERIOD = `${config.API_URL}/maintenance-period`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddProjects() {
  let navigate = useNavigate();

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionAdd, setPermissionAdd] = useState(false);

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

  const [listUser, setListUser] = useState([]);
  const [listServices, setListServices] = useState([]);
  const [listPlanServices, setListPlanServices] = useState([]);
  const [listStatus, setListStatus] = useState([]);
  const [listMaintenancePeriod, setListMaintenancePeriod] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadListUsers();
    loadListServices();
    loadListPlanServices();
    loadListStatus();
    loadListMaintenancePeriod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredAdd = dataRoles.filter((role_add) => role_add.function_id === '667463d04bede188dfb46d7b');
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

  const handleUserChange = (event, value) => {
    setUserId(
      value.map((option) => ({
        _id: option._id,
        display_name: option.display_name
      }))
    );
  };

  const handleAddProjects = (e) => {
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

    const addProjects = {
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

    apiPost(`${PROJECTS}`, addProjects)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/dashboard/projects/list-projects');
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  return permissionAdd ? (
    <>
      <MainCard title="Thêm mới">
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
                    options={listUser}
                    getOptionLabel={(option) => option.display_name}
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
                  <Select id="statusId" value={statusId} label="Chọn trạng thái..." onChange={(e) => setStatusId(e.target.value)}>
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
              <Button variant="contained" size="medium" onClick={handleAddProjects}>
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
