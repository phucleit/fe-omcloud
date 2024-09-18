import { useNavigate, useParams } from 'react-router-dom';
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

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';
import { apiGet, apiGetById, apiUpdate, getRoles } from '../../utils/formatUtils';

const PLAN_SERVICES = `${config.API_URL}/plan-services`;
const SERVICES = `${config.API_URL}/services`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateServices() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionUpdate, setPermissionUpdate] = useState(false);

  const [listPlanServices, setListPlanServices] = useState([]);

  const [name, setName] = useState('');
  const [planServiceId, setPlanServiceId] = useState('');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadListRoles();
    loadDetailServices();
    loadListPlanServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '66746678f7f723b779b1b060');

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

  const loadDetailServices = async () => {
    const result = await apiGetById(`${SERVICES}`, currentId);
    setName(result.data.name);
    setPlanServiceId(result.data.plan_service_id._id);
  };

  const loadListPlanServices = async () => {
    const result = await apiGet(`${PLAN_SERVICES}`);
    setListPlanServices(result.data);
  };

  const handleUpdateServices = (e) => {
    e.preventDefault();
    if (name == '') {
      alert('Vui lòng nhập tên dịch vụ!');
      return;
    }

    const updateServices = {
      name: name,
      plan_service_id: planServiceId
    };

    apiUpdate(`${SERVICES}`, currentId, updateServices)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/dashboard/services/list-services');
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
                  <InputLabel>Tên dịch vụ</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên dịch vụ..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Gói dịch vụ</InputLabel>
                  <Select
                    id="planServiceId"
                    value={planServiceId}
                    label="Chọn gói dịch vụ..."
                    onChange={(e) => setPlanServiceId(e.target.value)}
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
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateServices}>
                Cập nhật
              </Button>
            </Item>
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
