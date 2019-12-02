import React from 'react';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input/index';
import firebase from '../firebase';
import * as ROUTES from '../constants/routes';

function Login() {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: ROUTES.DASHBOARD }};

  const login = (values, { setSubmitting }) => {
    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      .then(data => {
        console.log(data);
        history.push(from);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    password: Yup.string()
      .min(6, 'Password must be minimum of 6 characters')
      .required('Password is required')
  });

  return (
    <Formik 
      initialValues={{ email: 'admin@admin.com', password: '1qaz@WSX' }} 
      validationSchema={ validationSchema }
      onSubmit={ login }
    >
      {props => (
        <Form>
          <Input label="Email Address" name="email" type="email" placeholder="Enter your email address" />
          <Input label="Password" name="password" type="password" placeholder="Enter your password" />
          <button type="submit" disabled={props.isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
