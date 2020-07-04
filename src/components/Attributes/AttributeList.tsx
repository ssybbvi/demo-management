/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { Button } from 'antd';
import AttributeItem from './AttributeItem';
import { IAttributeDto } from './data';

interface AttributeListProps {
  value: IAttributeDto[];
  onChange?: (AttributeList: IAttributeDto[]) => void;
}

const AttributeList: React.FC<AttributeListProps> = ({ value, onChange }) => {
  return (
    <div>
      {value.map((item, index) => {
        return (
          <div key={item._id}>
            <AttributeItem
              value={item}
              onChange={(newItem: IAttributeDto) => {
                value.splice(index, 1, newItem);
                onChange && onChange([...value!]);
              }}
              onRemove={() => {
                value && value.splice(index, 1);
                onChange && onChange([...value!]);
              }}
            />
          </div>
        );
      })}
      <div>
        <Button
          onClick={() => {
            onChange &&
              onChange([...value, { _id: `${Date.now()}`, name: '', specifications: [] }]);
          }}
        >
          增加属性
        </Button>
      </div>
    </div>
  );
};

export default AttributeList;
