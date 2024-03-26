'use client';
import { Button, Form, FormProps, Input, InputNumber, Modal, Radio, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import type { RadioChangeEvent, SelectProps } from 'antd';
import { DataType } from '../InputProduct';
import { post } from '@/service/axios';
interface IModal {
  openModal: boolean
  setOpenModal: (modal: boolean) => void;
  dataProduct: DataType[];
  callBackFnc: () => void;
}

type FieldType = {
  productName: string;
  importPrice: number;
  price: number;
  interest: number;
  importAmount: number;
}

export const ModalInputProduct = (props: IModal) => {
  const [valueRadio, setValueRadio] = useState<number>(0);
  const [form] = Form.useForm();
  const importPrice = Form.useWatch('importPrice', form);
  const price = Form.useWatch('price', form);
  const onFinish: FormProps<FieldType>["onFinish"] = async (value) => {
    const { interest, ...newData } = value
    try {
      const response = await post('warehouse/create', newData)
      props.callBackFnc()
      handleCancel()
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    props.setOpenModal(false)
    form.resetFields()
  }

  const onChangeValueRadio = (e: RadioChangeEvent) => {
    form.resetFields()
    setValueRadio(e.target.value)
  }

  const onChangeValueProduct = (value: string) => {
    const infoProduct = props.dataProduct.find(id => value === id._id)
    if (!infoProduct) return
    form.setFieldsValue({
      importPrice: infoProduct?.importPrice,
      price: infoProduct?.price,
      interest: Number(infoProduct?.price - infoProduct?.importPrice)
    })
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
      <div className='text-center mb-[20px]'>
        <h1 className='text-[25px] mb-[10px] uppercase font-bold'>Nhập hàng</h1>
        <Radio.Group onChange={onChangeValueRadio} value={valueRadio}>
          <Radio value={0}>Nhập mới</Radio>
          <Radio value={1}>Nhập tồn</Radio>
        </Radio.Group>
      </div>
      <Form
        form={form}
        name='import'
        labelCol={{ span: 8 }}
        onFinish={onFinish}
      >
        {valueRadio ?
          <Form.Item<FieldType>
            label="Tên sản phẩm"
            name="productName"
            rules={[{ required: true, message: 'Cần nhập tên sản phẩm' }]}
          >
            <Select options={props.dataProduct?.map(item => {
              return {
                label: item.productName,
                value: item._id,
              }
            })}
              style={{ width: '100%' }}
              onChange={onChangeValueProduct}
            />
          </Form.Item>
          :
          <Form.Item<FieldType>
            label="Tên sản phẩm"
            name="productName"
            rules={[{ required: true, message: 'Cần nhập tên sản phẩm' }]}
          >
            <Input placeholder='Nhập tên sản phẩm...' />
          </Form.Item>
        }


        <Form.Item<FieldType>
          label="Số lượng nhập"
          name="importAmount"
          rules={[{ required: true, message: 'Cần nhập số lượng sản phẩm' }]}
        >
          <InputNumber
            min={1}
            max={100}
            placeholder='1,2,3,...'
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giá nhập hàng"
          name="importPrice"
          rules={[{ required: true, message: 'Cần nhập giá sản phẩm' }]}
        >
          <InputNumber
            placeholder='123,000'
            disabled={!!valueRadio}
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
            placeholder='123,000'
            disabled={!!valueRadio}
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