// LoginPage component: This file defines a React component for the login page using Formik for form handling and Yup for validation. It also uses Redux for state management and Ant Design components for UI elements.

import React, { useState } from "react"; // Importing React and the useState hook from the React library
import { withRouter } from "react-router-dom"; // Importing withRouter HOC from react-router-dom for routing
import { loginUser } from "../../../_actions/user_actions"; // Importing loginUser action from the user_actions file
import { Formik } from 'formik'; // Importing Formik for form handling
import * as Yup from 'yup'; // Importing Yup for value parsing and validation
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd'; // Importing UI components from antd library
import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux for dispatching actions

const { Title } = Typography; // Destructuring Title from Typography for use in JSX

function LoginPage(props) { // LoginPage component definition
  const dispatch = useDispatch(); // Hook to dispatch actions
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false; // Check if 'rememberMe' is stored in localStorage

  const [formErrorMessage, setFormErrorMessage] = useState('') // State for form error message
  const [rememberMe, setRememberMe] = useState(rememberMeChecked) // State for remember me checkbox

  const handleRememberMe = () => { // Toggle remember me state
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : ''; // Get initial email from localStorage if 'rememberMe' is checked

  return ( // Render the login form using Formik
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push("/");
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">

            <Title level={2}>Log In</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>

              <Form.Item required>
                <Input
                  id="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                  forgot password
                  </a>
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    Log in
                </Button>
                </div>
                Or <a href="/register">register now!</a>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage); // Exporting LoginPage component wrapped with withRouter HOC for routing purposes