import React from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { addTask } from '../../actions/task';
import { setAlert } from '../../actions/alert';
import { Title } from '../../elements/texts';
import { FormBlock } from '../../elements/blocks';
import { Input, Button, TextArea } from '../../elements/inputs';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

const AddTask = ({ history, addTask, setAlert }) => {
  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <FormBlock>
        <Title> Add Task </Title>

        <Formik
          initialValues={{ title: '', description: '' }}
          validationSchema={Yup.object({
            title: Yup.string().required('Title is Required'),
            description: Yup.string().required(
              'Please add some details of your task'
            ),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            addTask(values);
            setAlert({ msg: 'Successfully Added', alertType: 'primary' });
            resetForm({});
            history.push('/home');
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title}</div>
              ) : null}
              <Input
                placeholder="Title"
                name="title"
                {...formik.getFieldProps('title')}
              ></Input>

              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}

              <TextArea
                name="description"
                id=""
                cols="30"
                rows="10"
                placeholder="Describe your task here..."
                {...formik.getFieldProps('description')}
              ></TextArea>

              <Button type="submit">Submit</Button>
            </form>
          )}
        </Formik>
      </FormBlock>
    </motion.div>
  );
};

export default connect(null, { addTask, setAlert })(AddTask);
