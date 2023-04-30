import React, { useState, useContext } from 'react';
import { Form, Input, InputNumber, Button, Upload, message, Table, Modal, Card, Col, Row} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { ProductsContext } from '../App';

const AdminPage = () => {
  const [form] = Form.useForm();
  const { products, setHistory } = useContext(ProductsContext);
  const [productList, setProductList] = useState(products);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState([]);


  const onFinish = (values) => {
    const newProduct = {
      id: productList.length + 1,
      name: values.name,
      img: fileList[0].thumbUrl,
      desc: values.desc,
      category: values.category,
      price: values.price,
      agreement: false,
      comments: []
    };
    setProductList([...productList, newProduct]);
    setHistory((prevHistory) => [...prevHistory, `Added new product: ${newProduct.name}`]);
    message.success(`Product "${newProduct.name}" has been added`);
    form.resetFields();
    setFileList([]);
  };


  const handlePreview = (file) => {
    setPreviewImage(file.thumbUrl);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
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
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          price: 0,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input product name!',
            },
          ]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>
        <Form.Item label="Description" name="desc"
          rules={[
            {
              required: true,
              message: 'Please input product description!',
            },
          ]}
        >
          <Input.TextArea placeholder="Enter product description" />
        </Form.Item>
        <Form.Item label="Category" name="category"
          rules={[
            {
              required: true,
              message: 'Please select product category!',
            },
          ]}
        >
          <Input placeholder="Enter product category" />
        </Form.Item>
        <Form.Item label="Price" name="price"
          rules={[
            {
              required: true,
              message: 'Please input product price!',
            },
          ]}
        >
        <InputNumber min={0} placeholder="Enter product price" />
        </Form.Item>
        <Form.Item label="Image" name="image"
          rules={[
            {
              required: true,
              message: 'Please upload product image!',
            },
          ]}
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
  