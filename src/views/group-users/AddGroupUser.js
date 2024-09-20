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
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import MainCard from 'ui-component/cards/MainCard';

import config from '../../config';

import { apiGet, apiPost } from '../../utils/formatUtils';

const LIST_FUNCTION = `${config.API_URL}/functions`;

const parent_id_tai_khoan = '667460e3d19aa9fcecc69fa6';
const parent_id_dich_vu = '667463d04bede188dfb46d75';
const parent_id_loai_dich_vu = '667463d04bede188dfb4610a';
const parent_id_cong_trinh = '667463d04bede188dfb46d7a';
const parent_id_trang_thai = '667467eb263fb998b9925d36';
const parent_id_bao_cao = '667467eb263fb998b9925d46';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function AddGroupUser() {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dataFunctions, setDataFunctions] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadListFunctions();
  }, []);

  const loadListFunctions = async () => {
    const result = await apiGet(`${LIST_FUNCTION}`);
    setDataFunctions(result.data);
  };

  const filteredItemsTaiKhoan = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_tai_khoan);
  const filteredItemsDichVu = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_dich_vu);
  const filteredItemsLoaiDichVu = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_loai_dich_vu);
  const filteredItemsCongTrinh = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_cong_trinh);
  const filteredItemsTrangThai = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_trang_thai);
  const filteredItemsBaoCao = dataFunctions.filter((item) => item.fuction_parent_id === parent_id_bao_cao);

  const handleChangeGroupUser = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevItems) => {
      if (checked) {
        return [...prevItems, name];
      } else {
        return prevItems.filter((item) => item !== name);
      }
    });
  };

  const handleAddGroupUser = (e) => {
    e.preventDefault();

    if (name == '') {
      alert('Vui lòng nhập tên nhóm!');
      return;
    }

    if (description == '') {
      alert('Vui lòng nhập mô tả nhóm!');
      return;
    }

    const addGroupUser = {
      name: name,
      description: description,
      group: checkedItems
    };

    apiPost(`${LIST_FUNCTION}`, addGroupUser)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          navigate('/dashboard/users/list-group-users');
        }, 1500);
      })
      .catch((error) => {
        const message = error.response ? error.response.data : '';
        alert(message);
      });
  };

  return (
    <>
      <MainCard title="Tạo nhóm người dùng">
        <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Tên nhóm</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    placeholder="Nhập tên nhóm..."
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Mô tả nhóm</InputLabel>
                  <TextField
                    id="description"
                    name="description"
                    label="Mô tả nhóm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nhập mô tả nhóm..."
                    multiline
                    rows={5}
                  />
                </FormControl>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>Tài khoản</Item>
              <Box component="section">
                <FormGroup>
                  {filteredItemsTaiKhoan.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Dịch vụ</Item>
              <Box component="section">
                <FormGroup>
                  {filteredItemsDichVu.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Loại dịch vụ</Item>
              <Box component="section">
                <FormGroup>
                  {filteredItemsLoaiDichVu.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Trạng thái</Item>
              <Box component="section">
                <FormGroup>
                  {filteredItemsTrangThai.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Công trình</Item>
              <Box component="section">
                <FormGroup>
                  {filteredItemsCongTrinh.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Item>Báo cáo</Item>
              <Box component="section">
                <FormGroup>
                  {filteredItemsBaoCao.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      control={<Checkbox checked={checkedItems.includes(item._id)} onChange={handleChangeGroupUser} name={item._id} />}
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <Button variant="contained" size="medium" onClick={handleAddGroupUser}>
                  Tạo nhóm
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000}>
        <Alert severity="success">Tạo nhóm thành công!</Alert>
      </Snackbar>
    </>
  );
}
