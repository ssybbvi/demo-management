/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Button } from 'antd';
import SpecificationItem from './SpecificationItem';
import { ISpecificationDto } from './data';
import styles from './index.less';

interface SpecificationListProps {
  items: ISpecificationDto[];
  onChange: (specificationList: ISpecificationDto[]) => void;
}

const SpecificationList: React.FC<SpecificationListProps> = ({ items, onChange }) => {
  return (
    <div className={styles.specificationlist}>
      {items.map((item, index) => {
        return (
          <div key={item._id}>
            <SpecificationItem
              value={item}
              onChange={(newItem: ISpecificationDto) => {
                items.splice(index, 1, newItem);
                onChange([...items]);
              }}
              onRemove={() => {
                items.splice(index, 1);
                onChange([...items]);
              }}
            />
          </div>
        );
      })}
      <div>
        <Button
          onClick={() => {
            onChange([...items, { _id: `${Date.now()}`, name: '', icon: '' }]);
          }}
        >
          增加规格
        </Button>
      </div>
    </div>
  );
};

export default SpecificationList;
