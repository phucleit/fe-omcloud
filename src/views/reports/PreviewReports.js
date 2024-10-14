import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';

import { PDFExport } from '@progress/kendo-react-pdf';

import config from '../../config';
import { apiGetById, getExportDate, getRoles } from '../../utils/formatUtils';

import ConvertBaseUrl from './ConvertBaseUrl';

const REPORTS = `${config.API_URL}/reports`;
const API = `${config.API_URL}`;

export default function PreviewReports() {
  const paramId = useParams();
  const currentId = paramId.id;

  const [dataRoles, setDataRoles] = useState([]);
  const [permissionExport, setPermissionExport] = useState(false);

  const [data, setData] = useState('');
  const [code, setCode] = useState('');

  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const formattedDate = `Ngày ${day}, Tháng ${month}, Năm ${year}`;

  useEffect(() => {
    loadListRoles();
    loadDetailReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoles.length > 0) {
      const filteredExport = dataRoles.filter((role_add) => role_add.function_id === '667467eb263fb998b9925d48');
      if (filteredExport.length > 0) {
        setPermissionExport(true);
      } else {
        setPermissionExport(false);
      }
    }
  }, [dataRoles]);

  const loadListRoles = async () => {
    const result = await getRoles();
    setDataRoles(result.data);
  };

  const loadDetailReports = async () => {
    const result = await apiGetById(`${REPORTS}`, currentId);
    setData(result.data);
    setCode(result.data.code);
  };

  const pdfExportComponent = useRef(null);

  const handleExportWithComponent = () => {
    pdfExportComponent.current.save({ fileName: `export_${code}.pdf` });
  };

  const showFrequency = (e) => {
    let string = '';
    if (e == 1) {
      string = 'Hàng tháng';
    } else if (e == 2) {
      string = 'Hàng quý';
    } else if (e == 3) {
      string = 'Nửa năm';
    } else {
      string = 'Hàng Năm';
    }

    return string;
  };

  const showStatus = (e) => {
    let string = '';
    if (e == 1) {
      string = 'Không hài lòng';
    } else if (e == 2) {
      string = 'Chấp nhận';
    } else if (e == 3) {
      string = 'Hài lòng';
    } else {
      string = 'Rất hài lòng';
    }

    return string;
  };

  return (
    <>
      <MainCard title="Xem báo cáo">
        <PDFExport ref={pdfExportComponent} paperSize="A4">
          <div className="check">
            <div className="headers">
              <div className="header_left">
                <span className="header">HICON M&E</span>
                <div className="companyName">
                  <span className="com1">Công ty cổ phần cơ điện và bảo trì Hicon ( M&E)</span>
                </div>
              </div>
              <div className="header_right">
                <div className="companyName">
                  <span className="com1">Mã hiệu: {data.code}</span>
                  <span className="com1">Ngày ban hành: {getExportDate(data.date_of_issue)}</span>
                  <span className="com1">Lần ban hành: {data.times_issued}</span>
                </div>
              </div>
            </div>

            <h2
              style={{
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 700,
                marginTop: '10px'
              }}
            >
              {data.name}
            </h2>

            <table>
              <tr>
                <th colSpan="2">BÁO CÁO BẢO TRÌ HỆ THỐNG PHÒNG CHÁY CHỮA CHÁY</th>
              </tr>
              <tr>
                <td>Tên khách hàng / Client name</td>
                <td>{data.project_id?.representative_name}</td>
              </tr>
              <tr>
                <td>Địa chỉ / Address</td>
                <td>{data.project_id?.address}</td>
              </tr>
              <tr>
                <td>Dự án / Project</td>
                <td>{data.project_id?.name}</td>
              </tr>
              <tr>
                <td>Tần suất bảo dưỡng/ Frequency</td>
                <td>{showFrequency(data.frequency)}</td>
              </tr>
              <tr>
                <td>Ngày kiểm tra / Date</td>
                <td>
                  {getExportDate(data.register_test_date)} đến {getExportDate(data.expired_test_date)}
                </td>
              </tr>
            </table>

            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                marginTop: '30px',
                marginBottom: '10px'
              }}
            >
              THÔNG TIN BẢO TRÌ
            </h2>

            <table>
              <tr>
                <th>Thiết bị bảo trì</th>
                <th>Hình ảnh bảo trì</th>
                <th>Mô tả công việc</th>
              </tr>
              {data.tasks?.map((e) => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td style={{ width: '300px' }}>
                    <a key={e._id} style={{ margin: '5px' }} href={`${API}${e.image}`} target="_blank" rel="noreferrer">
                      <ConvertBaseUrl imageUrl={`${API}${e.image}`} />
                    </a>
                  </td>
                  <td>{e.description}</td>
                </tr>
              ))}
            </table>

            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                marginTop: '30px',
                marginBottom: '10px'
              }}
            >
              TỔNG HỢP VẬT TƯ THIẾT BỊ THAY THẾ
            </h2>

            <table>
              <tr>
                <th>Vật tư, thiết bị</th>
                <th>Đơn vị</th>
                <th>Số lượng</th>
              </tr>
              {data.items?.map((e) => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td style={{ width: '300px' }}>{e.unit}</td>
                  <td>{e.quantity}</td>
                </tr>
              ))}
            </table>

            <table>
              <tr>
                <th>Nhận xét của Hicon M-E</th>
                <th>Nhận xét khách hàng (*)</th>
              </tr>
              <tr>
                <td>{data.hicon_comment}</td>
                <td>{data.customer_comment}</td>
              </tr>
            </table>

            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                marginTop: '30px',
                marginBottom: '10px'
              }}
            >
              ĐÁNH GIÁ
            </h2>
            <table>
              <tr>
                <th>Đội trưởng (Họ tên và chữ ký)/Team Leader:</th>
                <th>Mức độ hài lòng</th>
                <th>Kí tên</th>
                <th>Tên /Name</th>
                <th>Vị trí</th>
              </tr>

              <tr>
                <td></td>
                <td>{showStatus(data.status)}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>

            <div className="footer">
              <p style={{ fontStyle: 'italic' }}>Hà Nội, {formattedDate}</p>
              <span style={{ fontStyle: 'italic' }}>HICON M&E AND MAINTENANCE SERVICES JSC.</span>
            </div>
          </div>
        </PDFExport>
        {permissionExport ? (
          <Button variant="contained" size="medium" onClick={handleExportWithComponent}>
            Xuất báo cáo
          </Button>
        ) : (
          ''
        )}
      </MainCard>
    </>
  );
}
