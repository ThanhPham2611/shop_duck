"use client";
import { FormatCurrency } from '@/utils/format';
import { Button, Table } from 'antd';
import type { TableProps } from 'antd';
import { ModalInputProduct } from '../ModalInputProduct';
import { useState } from 'react';

interface DataType {
  key: string;
  productName: string;
  importAmount: number;
  importPrice: number;
  price: number;
  interest: number;
  quantity: number
}
const InputProduct = () => {
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
      render: (interest: number) => <span>{FormatCurrency(interest)}</span>
    }
  ];

  const data = [
    {
      key: '1',
      productName: 'Oishi',
      importPrice: 8000,
      price: 10000,
      interest: 2000,
      importAmount: 1,
      quantity: 1
    }
  ]

  return (
    <div>
      <h1 className='mb-[40px] text-[30px] uppercase'>Nhập hàng</h1>
      <Button onClick={() => setOpenModal(true)} size='large' className='mb-[20px]'>Thêm sản phẩm</Button>
      <Table columns={columns} dataSource={data} bordered />
      <ModalInputProduct openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default InputProduct;