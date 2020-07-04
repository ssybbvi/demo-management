/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { Input, InputNumber, Switch } from 'antd';
import { ISkuDto } from '../data';

interface SkuListProps {
  items: ISkuDto[];
  onChange?: (value: ISkuDto) => void;
}

const SkuList: React.FC<SkuListProps> = ({ items, onChange }) => {
  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item._id}>
            <div>{item.name.join('-')}</div>
            <div>
              <InputNumber
                placeholder="价格"
                value={item.price}
                onChange={(value) => {
                  onChange &&
                    onChange({
                      ...item,
                      price: value as number,
                    });
                }}
              />
            </div>
            <div>
              <InputNumber
                placeholder="库存"
                value={item.stock}
                onChange={(value) => {
                  onChange &&
                    onChange({
                      ...item,
                      stock: value as number,
                    });
                }}
              />
            </div>
            <div>
              <Input
                placeholder="Code"
                value={item.code}
                onChange={(e) => {
                  onChange &&
                    onChange({
                      ...item,
                      code: e.target.value,
                    });
                }}
              />
            </div>
            <div>
              <Switch
                onChange={(checked) => {
                  onChange &&
                    onChange({
                      ...item,
                      isSufficient: checked,
                    });
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkuList;
