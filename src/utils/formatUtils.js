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
//     byteString = window.atob(dataURI.split(',')[1]);
//   } else {
//     byteString = decodeURIComponent(dataURI.split(',')[1]);
//   }

//   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

//   var ia = new Uint8Array(byteString.length);
//   for (var i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }

//   return new Blob([ia], { type: mimeString });
// }

// export function createFormData(formData, key, arr) {
//   console.log(arr);
//   for (let i = 0; i < arr.length; i++) {
//     for (var j in arr[i]) {
//       let finalKey = key + '[' + i + '][' + j + ']';
//       let data = arr[i][j];
//       if (finalKey === 'tasks[' + i + '][images]') {
//         $(`.editor-wrapper-${i} .editor-image`).each(function (j) {
//           const tmp = finalKey + '[' + j + ']';
//           if ($(this).attr('src') !== placeholder_add_image) {
//             formData.append(tmp, dataURItoBlob($(this).attr('src')));
//           }
//         });
//       } else {
//         formData.append(finalKey, data);
//       }
//     }
//   }
// }

// function dataURItoBlob(dataURI) {
//   const byteString = dataURI.split(',')[0].indexOf('base64') >= 0
//     ? window.atob(dataURI.split(',')[1])
//     : decodeURIComponent(dataURI.split(',')[1]);

//   const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

//   const ia = new Uint8Array(byteString.length);
//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }

//   return new Blob([ia], { type: mimeString });
// }

// export function createFormData(formData, key, arr) {
//   console.log(arr);
//   for (let i = 0; i < arr.length; i++) {
//     for (let j in arr[i]) {
//       const finalKey = `${key}[${i}][${j}]`;
//       const data = arr[i][j];

//       if (finalKey === `tasks[${i}][images]`) {
//         $(`.editor-wrapper-${i} .editor-image`).each(function (j) {
//           const imgSrc = $(this).attr('src');
//           const tmp = `${finalKey}[${j}]`;

//           // Check if imgSrc is a valid data URI
//           if (imgSrc && imgSrc.startsWith('data:image/')) {
//             formData.append(tmp, dataURItoBlob(imgSrc));
//           } else {
//             console.warn(`Invalid image source at index ${i}: ${imgSrc}`);
//           }
//         });
//       } else {
//         formData.append(finalKey, data);
//       }
//     }
//   }
// }
