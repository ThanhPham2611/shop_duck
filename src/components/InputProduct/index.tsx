"use client";
import { FormatCurrency } from '@/utils/format';
import { Button, Table } from 'antd';
import type { TableProps } from 'antd';
import { ModalInputProduct } from '../ModalInputProduct';
import { useEffect, useState } from 'react';
import { get } from '@/service/axios';

export interface DataType {
  _id: string;
  productName: string;
  importAmount: number;
  importPrice: number;
  price: number;
  interest: number;
  quantity: number
}
const InputProduct = () => {
  const [dataTable, setDataTable] = useState<DataType[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false);
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
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Số lượng',
      children: [
        {
          title: 'Nhập',
          dataIndex: 'importAmount',
          key: 'importAmount'
        },
        {
          title: 'Tồn',
          dataIndex: 'quantity',
          key: 'quantity'
        }
      ]
    },
    {
      title: 'Giá nhập hàng',
      dataIndex: 'importPrice',
      key: 'importPrice',
      render: (price) => <span>{FormatCurrency(price)}</span>
    },
    {
      title: 'Giá bán hàng',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span>{FormatCurrency(price)}</span>
    },
    {
      title: 'Lãi nhận',
      dataIndex: 'interest',
      key: 'interest',
      render: (_, record) => <span>{FormatCurrency(record.price - record.importPrice)}</span>
    }
  ];

  useEffect(() => {
    getDataProduct()
  }, [])

  const getDataProduct = async () => {
    const response = await get('warehouse');
    setDataTable(response)
  }

  return (
    <div>
      <h1 className='mb-[40px] text-[30px] uppercase'>Nhập hàng</h1>
      <Button onClick={() => setOpenModal(true)} size='large' className='mb-[20px]'>Thêm sản phẩm</Button>
      <Table columns={columns} dataSource={dataTable} bordered />
      <ModalInputProduct
        openModal={openModal}
        setOpenModal={setOpenModal}
        dataProduct={dataTable}
        callBackFnc={getDataProduct}
      />
    </div>
  );
}

export default InputProduct;