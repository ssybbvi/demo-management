/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import Attributes from '@/components/Attributes/index';
import Select from 'antd/es/select';
import { queryRule } from '@/pages/CategoryList/service';
import { ICategoryDto } from '@/pages/CategoryList/data';
import { IAttributeDto } from '@/components/Attributes/data';
import { v4 as uuidv4 } from 'uuid';
import { PicturesWall } from './PicturesWall';
import EditableTagGroup from './EditableTagGroup';
import { ICommodityTableListItem, ISkuDto } from '../data';
import SkuList from './SkuList';

const { Option } = Select;
const FormItem = Form.Item;

interface CreateFormProps {
  createModalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [categoryList, setCategoryList] = useState<ICategoryDto[]>([]);

  const [formVals, setFormVals] = useState<ICommodityTableListItem>({
    _id: '',
    name: '',
    description: '',
    images: [],
    fakeAmount: '',
    sales: 0,
    tags: [],
    imgesDescrptionList: [],
    type: 'ordinary',
    categoryId: '',
    skus: [],
    attributes: [],
  });

  useEffect(() => {
    (async () => {
      const result = await queryRule();
      setCategoryList(result.data);
    })();
  }, []);

  const [form] = Form.useForm();

  const { createModalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    form.resetFields();
  };

  const createSkuList = (attributeList: IAttributeDto[]): ISkuDto[] => {
    const skuList: ISkuDto[] = [];

    const skuLenth = attributeList.reduce((acc, item) => {
      const newAcc = acc * item.specifications.length;
      return newAcc;
    }, 1);

    for (let index = 0; index < skuLenth; index += 1) {
      skuList.push({
        _id: '',
        name: [],
        code: '',
        price: 0,
        stock: 0,
        isSufficient: true,
        combines: [],
      });
    }

    attributeList.forEach((attributeItem) => {
      const fillLength = skuLenth / attributeItem.specifications.length;
      attributeItem.specifications.forEach((specificationItem, specificationIndex) => {
        for (
          let skuIndex = specificationIndex * fillLength;
          skuIndex < (specificationIndex + 1) * fillLength;
          skuIndex = specificationIndex
        ) {
          const item = skuList[skuIndex];
          item.name.push(specificationItem.name);
          item.combines.push({
            attributeId: attributeItem._id,
            specificationId: specificationItem._id,
          });
          item._id = uuidv4();
        }
      });
    });
    return skuList;
  };

  const changeCategory = (categoryId: string) => {
    const category = categoryList.find((item) => item._id === categoryId)!;

    setFormVals({
      ...formVals,
      attributes: category!.attributes,
    });
  };

  return (
    <Modal
      destroyOnClose
      title="创建商品"
      visible={createModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form} initialValues={{ ...formVals }}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入至少两个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="描述"
          name="description"
          rules={[{ required: true, message: '请输入至少两个字符的描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="商品图片描述"
          name="images"
        >
          <PicturesWall images={formVals.images!} listType="picture" />
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="宣传价格"
          name="fakeAmount"
          rules={[{ required: true, message: '请输入至少两个字符的描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="标签"
          name="tags"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <EditableTagGroup value={formVals.tags} />
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="商品图片描述"
          name="imgesDescrptionList"
        >
          <PicturesWall images={formVals.imgesDescrptionList!} listType="picture" />
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="类型"
          name="type"
          rules={[{ required: true }]}
        >
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="ordinary">普通商品</Option>
            <Option value="bargain">砍价商品</Option>
            <Option value="giveaway">赠品</Option>
          </Select>
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="分类"
          name="categoryId"
          rules={[{ required: true }]}
        >
          <Select style={{ width: 120 }} onChange={(value) => changeCategory(value.toString())}>
            {categoryList.map((item) => {
              return (
                <Option key={item._id} value={item._id!}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="规格"
          name="skus"
          rules={[{ required: true, message: '请输入至少两个字符的规格！', min: 2 }]}
        >
          <SkuList items={formVals.skus} />
        </FormItem>

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="描述"
          name="attributes"
          rules={[{ required: true }]}
        >
          <Attributes
            value={formVals.attributes}
            onChange={(attributes: IAttributeDto[]) => {
              const skus = createSkuList(attributes);
              setFormVals({
                ...formVals,
                attributes,
                skus,
              });
            }}
          />
          {JSON.stringify(formVals.attributes)}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
