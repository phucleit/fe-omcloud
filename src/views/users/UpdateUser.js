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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Switch from '@mui/material/Switch';
import FormLabel from '@mui/material/FormLabel';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';
import { apiGet, apiGetById, apiUpdate, getRoles } from '../../utils/formatUtils';
const LIST_GROUP_USER = `${config.API_URL}/group-user`;

const LIST_USER = `${config.API_URL}/users`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function UpdateUser() {
  let navigate = useNavigate();
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataGroupUser, setDataGroupUser] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [permissionUpdate, setPermissionUpdate] = useState(false);

  const [displayname, setDisplayname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [group_user_id, setGroupUserId] = useState('');
  const [checkSendPass, setCheckSendPass] = useState(false);

  const [open, setOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    loadListRoles();
    loadDetailUser();
    loadListGroupUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredUpdate = dataRoles.filter((role_update) => role_update.function_id === '66746193cb45907845239f38');

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

  const loadListGroupUser = async () => {
    const result = await apiGet(`${LIST_GROUP_USER}`);
    setDataGroupUser(result.data);
  };

  const handlecheckSendPass = (e) => {
    setCheckSendPass(e.target.checked);
  };

  const loadDetailUser = async () => {
    const result = await apiGetById(`${LIST_USER}`, currentId);
    setDisplayname(result.data.display_name);
    setUsername(result.data.username);
    setPassword(result.data.password);
    setPhone(result.data.phone);
    setEmail(result.data.email);
    setGroupUserId(result.data.group_user_id);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (username == '') {
      alert('Vui lòng nhập tên đăng nhập!');
      return;
    }

    if (password == '') {
      alert('Vui lòng nhập mật khẩu!');
      return;
    }

    if (phone == '') {
      alert('Vui lòng nhập số điện thoại!');
      return;
    }

    if (email == '') {
      alert('Vui lòng nhập email!');
      return;
    }

    const updateUser = {
      display_name: displayname,
      username: username,
      password: password,
      phone: phone,
      email: email,
      group_user_id: group_user_id,
      check_send_pass: checkSendPass
    };

    apiUpdate(`${LIST_USER}`, currentId, updateUser)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/dashboard/users/list-users');
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
                  <InputLabel>Tên hiển thị</InputLabel>
                  <Input
                    id="displayname"
                    name="displayname"
                    value={displayname}
                    onChange={(e) => setDisplayname(e.target.value)}
                    required={true}
                    placeholder="Nhập tên hiển thị..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên đăng nhập</InputLabel>
                  <Input
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={true}
                    disabled
                    placeholder="Nhập tên đăng nhập..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Mật khẩu</InputLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                    disabled
                    placeholder="Nhập mật khẩu..."
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                          disabled
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Điện thoại</InputLabel>
                  <Input
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required={true}
                    placeholder="Nhập số điện thoại..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Email</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    placeholder="Nhập email..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Quyền</InputLabel>
                  <Select id="group_user_id" value={group_user_id} label="Chọn quyền..." onChange={(e) => setGroupUserId(e.target.value)}>
                    {dataGroupUser.map((item) => (
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
                  <FormLabel component="legend">Gửi mật khẩu qua mail</FormLabel>
                  <Switch checked={checkSendPass} onChange={handlecheckSendPass} />
                </FormControl>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Button variant="contained" size="medium" onClick={handleUpdateUser}>
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
