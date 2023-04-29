import React, { useContext, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { ProductsContext } from '../App';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import DebugHistory from './DebugHistory';
/*імпорт css-модуля*/
import styles from './styles/prod-list.module.css';

/*styled-components*/
const StyledMain = styled.main`
  margin-top: 20px;
`;
/*зміна фонового кольору в залежності від id товару*/
const StyledItem = styled.div`
  background-color: ${(props) => `hsl(${props.id * 10}, 70%, 80%)`};
`;

function ProductList() {
  const history = useHistory();
  const { products, categories, setHistory } = useContext(ProductsContext);
  const { categoryName } = useParams();

  let filteredProducts = products;
  if (categoryName) {
    filteredProducts = products.filter((product) => product.category === categoryName);
  }

  /*використання TransitionGroup та CSSTransition для анімації появи товарів */
  return (
    <StyledMain>
      <div className={styles['full-width-div']}>
        <ul className={styles['horizontal-list']}>
          <li className={styles.categories}>
            <Link to="/">all</Link>
          </li>
          {categories.map((category) => (
            <li className={styles.categories} key={category}>
              <Link to={`/category/${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </div>
      <TransitionGroup className={styles['product-list']}>
        {filteredProducts.map((product) => (
          <CSSTransition key={product.id} classNames="fade" timeout={300}>
            <StyledItem id={product.id} className={styles.item}>
              <img src={product.img} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.price} UAH</p>
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>read more</Link>
              </div>
            </StyledItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </StyledMain>
  );
}

export default ProductList;
