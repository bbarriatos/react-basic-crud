import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Title, Wrapper } from '../elements/texts';
import { Input, Button } from '../elements/inputs';
import { FormBlock } from '../elements/blocks';
import { register } from '../actions/auth';

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
    transition: { ease: 'easeInOut' },
  },
};

const SignUp = ({ register, isAuthenticated, history }) => {
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
        <FormBlock className="form-block">
          <Title textTransform="uppercase">Register Now</Title>
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
              passwordConfirmation: Yup.string().oneOf(
                [Yup.ref('password'), null],
                'Password must match'
              ),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              register(values);
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

                {formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation ? (
                  <div>{formik.errors.passwordConfirmation}</div>
                ) : null}
                <Input
                  placeholder="Re-enter Password"
                  type="password"
                  name="passwordConfirmation"
                  {...formik.getFieldProps('passwordConfirmation')}
                ></Input>

                <Button type="submit">Sign Up</Button>
              </form>
            )}
          </Formik>
          <Button onClick={() => history.goBack()}>Back</Button>
        </FormBlock>
      </Wrapper>
    );
  }
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(SignUp);
