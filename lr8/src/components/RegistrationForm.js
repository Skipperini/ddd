import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from 'antd';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  lastName: Yup.string()
    .max(40, 'Last name must be at most 40 characters')
    .required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
});

const CustomInput = ({ field, form, ...props }) => {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const error = errors[name];
  const touchedField = touched[name];
  const errorStyle = {
    color: 'red',
  };
  return (
    <div>
      <Input
        {...props}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={touchedField && error ? 'error' : ''}
      />
      {touchedField && error && <div style={errorStyle}>{error}</div>}
    </div>
  );
};

const RegistrationForm = ({ onCancel }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <Field
              component={CustomInput}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name:</label>
            <Field
              component={CustomInput}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Field
              component={CustomInput}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Field
              component={CustomInput}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="buttons">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
