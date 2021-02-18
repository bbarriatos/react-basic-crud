import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Title, Wrapper } from '../elements/texts';
import { Input, Button } from '../elements/inputs';
import { FormBlock } from '../elements/blocks';
import { login } from '../actions/auth';

const formVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

const LogIn = ({ login, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  } else {
    return (
      <Wrapper
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="userForm"
      >
        <FormBlock>
          <Title textTransform="uppercase">Log In</Title>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            laoreet sit malesuada.
          </p>

          <Formik
            initialValues={{
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string().required('Email is required'),
              password: Yup.string().required('Password is required'),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const { email, password } = values;
              login({ email, password });
              resetForm({});
              setSubmitting(false);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
                <Input
                  placeholder="Email"
                  name="email"
                  {...formik.getFieldProps('email')}
                ></Input>

                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  {...formik.getFieldProps('password')}
                ></Input>

                <Button type="submit">Sign Up</Button>

                <p className="signup">
                  <strong>
                    Still without an account?{' '}
                    <Link to="/signup">Register Now</Link>
                  </strong>
                </p>
              </form>
            )}
          </Formik>
        </FormBlock>
      </Wrapper>
    );
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LogIn);
