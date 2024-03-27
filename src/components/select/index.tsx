import { get } from '@/service/axios'
import { Select } from 'antd'
import { useEffect, useState } from 'react'

interface DataTypeOptions {
  _id: string;
  productName: string;
  importAmount: number;
  importPrice: number;
  price: number;
  interest: number;
  quantity: number
}

interface ParamsSelect {
  value?: string | null;
  onChangeSelect: (value: string) => void;
}

export const SelectComponent = (params: ParamsSelect) => {
  const [dataOptions, setDataOptions] = useState<DataTypeOptions[]>([])
  useEffect(() => {
    getDataProduct()
  }, [])

  const getDataProduct = async () => {
    const response = await get('warehouse');
    setDataOptions(response)
  }
  return (
    <Select value={params.value} options={dataOptions.map(item => {
      return {
        label: item.productName,
        value: item.productName
      }
    })} style={{ width: '200px', marginBottom: 20 }} placeholder='Tìm kiếm sản phẩm'
      onChange={params.onChangeSelect}
    />
  )
}
