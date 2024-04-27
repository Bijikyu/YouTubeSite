```jsx
// This file defines a React component for the registration page of an application. It uses Formik for form handling, Yup for validation, Ant Design for UI components, and Redux for state management.

import React from "react"; // Importing React library
import moment from "moment"; // Importing moment library for date manipulation
import { Formik } from 'formik'; // Importing Formik for handling form state and validation
import * as Yup from 'yup'; // Importing Yup for schema validation
import { registerUser } from "../../../_actions/user_actions"; // Importing action creator for registering a user
import { useDispatch } from "react-redux"; // Importing hook to dispatch actions in Redux

import {
  Form,
  Input,
  Button,
} from 'antd'; // Importing UI components from Ant Design

const formItemLayout = { // Layout configuration for form items
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = { // Layout configuration for the tail of the form (submit button)
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) { // React functional component for the registration page
  const dispatch = useDispatch(); // Hook to dispatch Redux actions

  return (

    <Formik // Formik component to handle form state and submission
      initialValues={{ // Initial values for the form fields
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({ // Validation schema for the form fields
        name: Yup.string()
          .required('Name is required'),
        lastName: Yup.string()
          .required('Last Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => { // Function to handle form submission
        setTimeout(() => { // Simulate asynchronous operation using setTimeout

          let dataToSubmit = { // Data object to submit
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon` // Gravatar URL with a unique identifier
          };

          dispatch(registerUser(dataToSubmit)).then(response => { // Dispatching registerUser action and handling the promise
            if (response.payload.success) { // Checking if the registration was successful
              props.history.push("/login"); // Redirecting to the login page
            } else {
              alert(response.payload.err.errmsg) // Displaying error message
            }
          })

          setSubmitting(false); // Setting submitting state to false after form submission
        }, 500);
      }}
    >
      {props => { // Render prop function to access Formik props
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
        } = props; // Destructuring Formik props
        return (
          <div className="app"> // Container div for the form
            <h2>Sign up</h2> // Heading for the registration form
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} > // Ant Design Form component with layout and submit handler

              <Form.Item required label="Name"> // Form item for name input
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input' // Conditional class name for input validation
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div> // Error message for name input
                )}
              </Form.Item>

              <Form.Item required label="Last Name"> // Form item for last name input
                <Input
                  id="lastName"
                  placeholder="Enter your Last Name"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName ? 'text-input error' : 'text-input' // Conditional class name for input validation
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div> // Error message for last name input
                )}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}> // Form item for email input with validation feedback
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input' // Conditional class name for input validation
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div> // Error message for email input
                )}
              </Form.Item>

              <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}> // Form item for password input with validation feedback
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input' // Conditional class name for input validation
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div> // Error message for password input
                )}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback> // Form item for confirm password input with validation feedback
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input' // Conditional class name for input validation
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div> // Error message for confirm password input
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}> // Form item for submit button with layout configuration
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}> // Button component for form submission
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default RegisterPage // Exporting the RegisterPage component as the default export