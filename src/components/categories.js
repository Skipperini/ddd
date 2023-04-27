import React, { useState, useEffect } from 'react';

const Categories = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = [
    {
      key: 'all',
      name: 'all',
    },
    {
      key: 'food',
      name: 'food',
    },
    {
      key: 'toy',
      name: 'toys',
    },
    {
      key: 'collar',
      name: 'collars',
    },
    {
      key: 'bib',
      name: 'bibs',
    },
  ];

  useEffect(() => {
    console.log('Selected category has changed to:', selectedCategory);
  }, [selectedCategory]);

  const handleClick = (key) => {
    setSelectedCategory(key);
    props.chooseCategory(key);
  };

  return (
    <div className='categories'>
      {categories.map((el) => (
        <div
          key={el.key}
          onClick={() => handleClick(el.key)}
          className={el.key === selectedCategory ? 'selected' : ''}
        >
          {el.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
