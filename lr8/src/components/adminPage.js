import React, { useState, useContext } from 'react';
import { Form, Input, InputNumber, Button, Upload, message, Table, Modal, Card, Col, Row } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { ProductsContext } from '../App';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AdminPage = () => {
  const { products, setHistory } = useContext(ProductsContext);
  const [productList, setProductList] = useState(products);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      category: '',
      price: 0,
      image: [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Please input product name!'),
      desc: Yup.string().required('Please input product description!'),
      category: Yup.string().required('Please select product category!'),
      price: Yup.number()
    .required('Please input product price!')
    .min(1, 'Price must be greater than or equal to 1')
    .max(1000, 'Price must be less than or equal to 1000'),
      image: Yup.array().min(1, 'Please upload product image!'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newProduct = {
        id: productList.length + 1,
        name: values.name,
        img: values.image[0].thumbUrl,
        desc: values.desc,
        category: values.category,
        price: values.price,
        agreement: false,
        comments: []
      };
      setProductList([...productList, newProduct]);
      setHistory((prevHistory) => [...prevHistory, `Added new product: ${newProduct.name}`]);
      message.success(`Product "${newProduct.name}" has been added`);
      resetForm();
      setFileList([]);
    },
  });

  const handlePreview = (file) => {
    setPreviewImage(file.thumbUrl);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
    formik.setFieldValue('image', fileList);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (img) => <img src={img} alt="" style={{ height: 50 }} />,
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price}`,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Create New Product</h1>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          validateStatus={formik.errors.name ? 'error' : ''}
          help={formik.errors.name}
        >
          <Input
            placeholder="Enter product name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="desc"
          validateStatus={formik.errors.desc ? 'error' : ''}
          help={formik.errors.desc}
        >
          <Input.TextArea
            placeholder="Enter product description"
            value={formik.values.desc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          validateStatus={formik.errors.category ? 'error' : ''}
          help={formik.errors.category}
        >
          <Input
            placeholder="Enter product category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          validateStatus={formik.errors.price ? 'error' : ''}
          help={formik.errors.price}
        >
          <InputNumber
            min={0}
            placeholder="Enter product price"
            value={formik.values.price}
            onChange={(value) => formik.setFieldValue('price', value)}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          validateStatus={formik.errors.image ? 'error' : ''}
          help={formik.errors.image}
        >
          <Upload
            name="image"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Product
          </Button>
        </Form.Item>
      </Form>
      <h1>Cards</h1>
      <Row gutter={[16, 16]}>
        {productList.map((product) => (
          <Col key={product.id} lg={6}>
            <Card hoverable cover={<img src={product.img} alt={product.name} />} >
              <Card.Meta title={product.name} description={`Price: ${product.price}`} />
            </Card>
          </Col>
        ))}
      </Row>
      <h1>Table</h1>
      <Table columns={columns} dataSource={productList} rowKey="id" />
    </div>
  );
  };
  
  export default AdminPage;