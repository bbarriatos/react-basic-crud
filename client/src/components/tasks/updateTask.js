import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { getTaskId, updateTask } from '../../actions/task';
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
};

const UpdateTask = ({
  history,
  updateTask,
  task,
  getTaskId,
  setAlert,
  match: {
    params: { id },
  },
}) => {
  useEffect(() => {
    getTaskId(id);
  }, [getTaskId, id]);

  if (task.length === 0) {
    return 'Loading....';
  } else {
    return (
      <motion.div variants={formVariants} initial="hidden" animate="visible">
        <FormBlock>
          <Title> Update Task </Title>

          <Formik
            initialValues={task}
            validationSchema={Yup.object({
              title: Yup.string().required('Title is Required'),
              description: Yup.string().required(
                'Please add some details of your task'
              ),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              updateTask(values, id);
              setAlert({ msg: 'Task Updated', alertType: 'primary' });
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
                  defaultValue={task.email}
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
  }
};

const mapStateToProps = (state) => ({
  task: state.task.task,
});

export default connect(mapStateToProps, { updateTask, getTaskId, setAlert })(
  UpdateTask
);
