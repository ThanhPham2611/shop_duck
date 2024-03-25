'use client';
import { FormatCurrency } from '@/utils/format';
import { Button, Form, FormProps, Input, InputNumber, Modal, Space } from 'antd';
import { useEffect } from 'react';

interface IModal {
  openModal: boolean
  setOpenModal: (modal: boolean) => void;
}

type FieldType = {
  productName: string;
  importPrice: number;
  price: number;
  interest: number;
  amount: number;
}

export const ModalInputProduct = (props: IModal) => {
  const [form] = Form.useForm();
  const importPrice = Form.useWatch('importPrice', form);
  const price = Form.useWatch('price', form);
  const onFinish: FormProps<FieldType>["onFinish"] = (value) => {
    console.log(value)
  }

  const handleCancel = () => {
    props.setOpenModal(false)
  }

  useEffect(() => {
    if (price && importPrice) {
      form.setFieldsValue({
        interest: Number(price - importPrice)
      })
    }
  }, [importPrice, price])

  useEffect(() => {
    form.resetFields()
  }, [props.openModal])

  return (
    <Modal open={props.openModal} onCancel={handleCancel} footer={false}>
      <h1 className='text-center mb-[20px] text-[25px] uppercase font-bold'>Nhập hàng</h1>
      <Form
        form={form}
        name='import'
        labelCol={{ span: 8 }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Tên sản phẩm"
          name="productName"
          rules={[{ required: true, message: 'Cần nhập tên sản phẩm' }]}
        >
          <Input placeholder='Nhập tên sản phẩm...' />
        </Form.Item>

        <Form.Item<FieldType>
          label="Số lượng nhập"
          name="amount"
          rules={[{ required: true, message: 'Cần nhập số lượng sản phẩm' }]}
        >
          <InputNumber
            min={1}
            max={100}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giá nhập hàng"
          name="importPrice"
          rules={[{ required: true, message: 'Cần nhập giá sản phẩm' }]}
        >
          <InputNumber
            addonAfter={'VND'}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giá bán hàng"
          name="price"
          rules={[{ required: true, message: 'Cần nhập giá sản phẩm' }]}
        >
          <InputNumber
            addonAfter={'VND'}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Lãi nhận"
          name="interest"
        >
          <InputNumber
            disabled
            className=''
            addonAfter={'VND'}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Space className='justify-center w-full'>
          <Button onClick={handleCancel} className='min-w-[100px] h-[40px]'>Hủy</Button>
          <Button htmlType='submit' className='min-w-[100px] h-[40px] bg-[#FFD700] border-none text-black'>Xác nhận</Button>
        </Space>
      </Form>
    </Modal>
  )
}