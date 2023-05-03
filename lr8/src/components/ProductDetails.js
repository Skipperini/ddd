import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLogger, useStatus } from './myHooks';
import { ProductsContext } from '../App';
import Dialog from './Dialog';
import styles from './styles/details.module.css';

const validationSchema = Yup.object().shape({
  author: Yup.string().required('Author is required'),
  content: Yup.string().required('Comment is required'),
});

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

  const handleSubmit = (values, { resetForm }) => {
    const { author, content } = values;

    const newComment = { author, content };

    setComments((prevComments) => [...prevComments, newComment]);

    resetForm();

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
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
      {/* CurrencyConverter component */}
      <h3>Comments:</h3>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.author}:</strong> {comment.content}
</li>
))}
</ul><Formik
    initialValues={{ author: '', content: '' }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    <Form>
    <label htmlFor="author">Author:</label>
      <div>
        <Field type="text" id="author" name="author" />
        <ErrorMessage name="author" component="div" className="error" />
      </div>

      <label htmlFor="content">Comment:</label>
      <div>
        <Field as="textarea" id="content" name="content" />
        <ErrorMessage name="content" component="div" className="error" />
      </div>

      <button type="submit">Submit</button>
    </Form>
  </Formik>

  <Link to="/">Назад</Link>

  <Dialog
    isOpen={isDialogOpen}
    onClose={handleDialogClose}
    content={`Ваш відгук: «${comments[comments.length - 1]?.content}» додано успішно!`}
  />
</div>);
};

export default ProductDetails;
