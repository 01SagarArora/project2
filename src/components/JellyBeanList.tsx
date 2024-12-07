import React from 'react';

interface JellyBeanListProps {
  items: Record<string, any>[];
}

const jellyBeanList: React.FC<JellyBeanListProps> = ({ items }) => {
  return (    
      <ul className="jelly-bean-list">
        {
          items.map((item) => (
            <li key={item.beanId}>{JSON.stringify(item.beanId)}
              <img src={item.imageUrl} alt={item.description} style={{ width: '200px', height: '150px', objectFit: 'cover' }}
              />
            </li>
          ))
        }
      </ul>    
  );
};

export default jellyBeanList;
