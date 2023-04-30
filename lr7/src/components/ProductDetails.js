import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import CurrencyConverter from './CurrencyConverter';
import { useLogger, useStatus } from './myHooks';
import { ProductsContext } from '../App';
import Dialog from './Dialog';
/* імпорт css-модуля*/
import styles from './styles/details.module.css';


const ProductDetails = () => {
  const { products } = useContext(ProductsContext);
  const { id } = useParams();

  const product = products.find((product) => product.id === parseInt(id));

  const [exchangeRate, setExchangeRate] = useStatus(40);
  useLogger(exchangeRate, 'exchange Rate');
  const [comments, setComments] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleExchangeRateChange = (event) => {
    setExchangeRate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const author = event.target.author.value;
    const content = event.target.content.value;

    const newComment = { author, content };

    setComments((prevComments) => [...prevComments, newComment]);

    event.target.reset();

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    /* використання */
    <div className={styles['product-details']}>
      <h2 className={styles['product-name']}>{product.name}</h2>
      <img src={product.img} alt={product.name} />
      <div>
        <label htmlFor="exchangeRate">Exchange rate (USD TO UAH): </label>
        <input
          type="number"
          id="exchangeRate"
          name="exchangeRate"
          value={exchangeRate}
          onChange={handleExchangeRateChange}
        />
      </div>
      <p>{product.desc}</p>
      <CurrencyConverter priceInUAH={product.price} exchangeRate={exchangeRate} />
      <h3>Comments:</h3>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.author}:</strong> {comment.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Author:</label>
        <div>
          <input type="text" id="author" name="author" required />
        </div>
        <label htmlFor="content">Comment:</label>
        <div>
          <textarea id="content" name="content" required />
        </div>
        <button type="submit">Submit</button>
  </form>
    <Link to="/">Назад</Link>
    <Dialog
    isOpen={isDialogOpen}
    onClose={handleDialogClose}
    content={`Ваш відгук: «${comments[comments.length - 1]?.content}» додано успішно!`}
  />
</div>
);
};

export default ProductDetails;