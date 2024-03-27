'use client';
import { Button, Select, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import moment from 'moment';
import { SelectComponent } from '../select';
import { get } from '@/service/axios';
import { useEffect, useState } from 'react';

export interface DataType {
  _id: string;
  productName: string;
  importAmount: number;
  createdAt: string;
}

type ParamsGetDataHistory = {
  productName?: string;
  createdAt?: string;
}

const TableImportHistory = () => {
  const [dataTable, setDataTable] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [button, setButton] = useState<boolean>(false);
  const [dataSelect, setDataSelect] = useState<string | null>(null);

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

  const getDataHistory = async (params?: ParamsGetDataHistory) => {
    setLoading(true)
    try {
      const response = await get(`import-history`, params);
      setDataTable(response);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleOnChangeSelect = async (value: string) => {
    setDataSelect(value)
    setButton(true)
    await getDataHistory({ productName: value })
  }

  const handleDeleteFilter = async () => {
    setDataSelect(null)
    setButton(false)
    await getDataHistory()
  }

  useEffect(() => {
    getDataHistory()
  }, [])

  return (
    <div>
      <h1 className='mb-[40px] text-[30px] uppercase'>Lịch sử nhập hàng</h1>
      <Space size={25} align='baseline'>
        <SelectComponent value={dataSelect} onChangeSelect={handleOnChangeSelect} />
        {button && <Button onClick={handleDeleteFilter}>Xóa</Button>}
      </Space>
      <Table loading={loading} columns={columns} dataSource={dataTable} bordered />
    </div>
  )
}

export default TableImportHistory;