'use client';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import moment from 'moment';

export interface DataType {
  _id: string;
  productName: string;
  importAmount: number;
  createdAt: string;
}

const TableImportHistory = () => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'STT',
      key: 'stt',
      width: 50,
      render: (item, record, index) => <span>{index + 1}</span>
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (text: string) => <span>{text}</span>
    },
    {
      title: 'Số lượng nhập',
      dataIndex: 'importAmount',
      key: 'importAmount',
      render: (importAmount: number) => <span>{importAmount}</span>
    },
    {
      title: 'Thời gian nhập',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <span>{moment(date).format('DD/MM/YYYY HH:mm:ss')}</span>
    },
  ]

  const data: DataType[] = [
    {
      _id: '12',
      importAmount: 4,
      productName: 'Oishi',
      createdAt: '2024-03-26T18:00:04+07:00'
    }
  ]

  return (
    <div>
      <h1 className='mb-[40px] text-[30px] uppercase'>Lich su nhap hang</h1>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  )
}

export default TableImportHistory;