
import React, { useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { ProductsContext } from '../App';
import  DebugHistory from './DebugHistory';
import { useEffect } from 'react';

function ProductList () {
  const history = useHistory();
  const { products, categories } = useContext(ProductsContext);
  const { categoryName } = useParams();


  let filteredProducts = products;
  if (categoryName) {
    filteredProducts = products.filter((product) => product.category === categoryName);
  }
   // відстеження історії переходів користувача
   useEffect(() => {
    const unlisten = history.listen((location) => {
      console.log(`User navigated to: ${location.pathname}`);
    });
    return unlisten;
  }, [history]);
return(
  <main>
  
<div className='full-width-div'>
      <ul className='horizontal-list '>
        <li className='categories'>
          <Link to="/">all</Link>
        </li>
        {categories.map((category) => (
          <li className='categories' key={category}>
            <Link to={`/category/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
      </div>
    {filteredProducts.map((product) => (
      <div className='item' key={product.id}>
        <img src={product.img}/>
        <h2>{product.name}</h2>
        <p>{product.price} UAH</p> 
        <div key={product.id}>
            <Link to={`/products/${product.id}`}>read more</Link>
          </div>
        </div>
    ))}

    </main>
    
);
    };

export default ProductList;
