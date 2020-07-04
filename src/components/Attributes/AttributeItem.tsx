/* eslint-disable no-unused-expressions */
import React from 'react';
import { Input, Button } from 'antd';
import SpecificationList from './SpecificationList';
import { IAttributeDto } from './data';
import styles from './index.less';

interface AttributeProps {
  value: IAttributeDto;
  onChange?: (value: IAttributeDto) => void;
  onRemove?: () => void;
}

const AttributeItem: React.FC<AttributeProps> = ({ value, onChange, onRemove }) => {
  return (
    <div className={styles.attributeitem}>
      <div>
        <Input
          placeholder="名称"
          value={value.name}
          onChange={(e) => {
            onChange &&
              onChange({
                ...value,
                name: e.target.value,
              });
          }}
        />
      </div>
      <div>
        <SpecificationList
          items={value.specifications || []}
          onChange={(newSpecifications) => {
            onChange &&
              onChange({
                ...value,
                specifications: newSpecifications,
              });
          }}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            onRemove && onRemove();
          }}
        >
          删除属性
        </Button>
      </div>
    </div>
  );
};

export default AttributeItem;
