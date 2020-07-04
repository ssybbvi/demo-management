import React from 'react';
import { Input, Button } from 'antd';
import { ISpecificationDto } from './data';
import styles from './index.less';

interface SpecificationProps {
  value: ISpecificationDto;
  onChange: (newItem: ISpecificationDto) => void;
  onRemove: () => void;
}

const SpecificationItem: React.FC<SpecificationProps> = ({ value, onChange, onRemove }) => {
  return (
    <div className={styles.specificationitem}>
      <div>
        <Input
          placeholder="名称"
          value={value.name}
          onChange={(e) => {
            onChange({ ...value, name: e.target.value });
          }}
        />
      </div>
      <div>
        <Input
          placeholder="图标"
          value={value.icon}
          onChange={(e) => {
            onChange({ ...value, icon: e.target.value });
          }}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            onRemove();
          }}
        >
          删除规格
        </Button>
      </div>
    </div>
  );
};

export default SpecificationItem;
