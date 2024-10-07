import axios from 'axios';
import Cookies from 'js-cookie';

import config from '../config';
// import placeholder_add_image from '../assets/images/placeholder_add_image.png';

export function apiGet(url, headers = {}) {
  return axios.get(url, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: Cookies.get('token'),
      ...headers
    }
  });
}

export function apiPost(url, data, headers = {}) {
  return axios.post(url, data, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: Cookies.get('token'),
      ...headers
    }
  });
}

export function apiPostFile(url, data, headers = {}) {
  console.log(data);
  return axios.post(url, data, {
    headers: {
      'Cache-Control': 'no-cache',
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      token: Cookies.get('token'),
      ...headers
    }
  });
}

export function apiGetById(url, id, headers = {}) {
  return axios.get(`${url}/${id}`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: Cookies.get('token'),
      ...headers
    }
  });
}

export function apiUpdate(url, id, data, headers = {}) {
  return axios.put(`${url}/${id}`, data, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: Cookies.get('token'),
      ...headers
    }
  });
}

export function apiUpdateFile(url, id, data, headers = {}) {
  return axios.put(`${url}/${id}`, data, {
    headers: {
      'Cache-Control': 'no-cache',
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      token: Cookies.get('token'),
      ...headers
    }
  });
}

export function apiDelete(url, id, headers = {}) {
  return axios.delete(`${url}/${id}`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: Cookies.get('token'),
      ...headers
    }
  });
}

export async function getRoles() {
  const list_roles = await axios.get(`${config.API_URL}/functions/list-roles/${Cookies.get('group_user_id')}`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      token: Cookies.get('token')
    }
  });
  return list_roles;
}

export function formatPhoneNumber(phoneNumber) {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  const formattedNumber = digitsOnly.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  return formattedNumber;
}

export function getCreatedAt(params) {
  if (params) {
    var timeStamp = params;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
    return date + ' ' + time;
  }
}

export function getRegisteredAt(params) {
  if (params) {
    var timeStamp = params;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
    return date + ' ' + time;
  }
}

export function getExpiredAt(params) {
  if (params) {
    var timeStamp = params;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    var time = new Date(timeStamp).toLocaleTimeString('vi-VI');
    return date + ' ' + time;
  }
}

export function getExportDate(params) {
  if (params) {
    var timeStamp = params;
    var date = new Date(timeStamp).toLocaleDateString('vi-VI');
    return date;
  }
}

export function convertPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export function maskPhoneNumber(phoneNumber) {
  const parts = phoneNumber.split(' ');
  if (parts.length < 2) return phoneNumber;
  parts[2] = '*****';
  return parts.join(' ');
}

export function formatCurrency(value) {
  const roundedValue = Math.round(value / 1000) * 1000;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(roundedValue);
}

// function dataURItoBlob(dataURI) {
//   var byteString;
//   if (dataURI.split(',')[0].indexOf('base64') >= 0) {
//     byteString = atob(dataURI.split(',')[1]);
//   } else {
//     byteString = unescape(dataURI.split(',')[1]);
//   }

//   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

//   var ia = new Uint8Array(byteString.length);
//   for (var i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }
//   return new Blob([ia], { type: mimeString });
// }

// export function convertFile(dataURI) {
//   if (dataURI) {
//     const blob = dataURItoBlob(dataURI);
//     const filename = `image_${Date.now()}.png`;
//     return new File([blob], filename, { type: blob.type });
//   }
// }
