import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { TaskBlock } from '../../elements/blocks';
import { UpdateButton, DeleteButton, ViewButton } from '../../elements/inputs';
import { Title } from '../../elements/texts';
import { getTask, deleteTask, getTaskId } from '../../actions/task';
import { setAlert } from '../../actions/alert';

const blockVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { y: -30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Tasks = ({ task, getTask, getTaskId, deleteTask, setAlert }) => {
  useEffect(() => {
    getTask();
  }, [getTask]);

  const handleDelete = (id) => {
    deleteTask(id);
    setAlert({ msg: 'Task Remove', alertType: 'danger' });
  };

  return task && task.length === 0 ? (
    <Title variants={blockVariants} initial="hidden" animate="visible">
      No Current Task
    </Title>
  ) : (
    <motion.div variants={staggerVariants} initial="hidden" animate="visible">
      {task.slice(0, 4).map((i) => (
        <TaskBlock variants={item} key={i._id}>
          <Title alignment="left">{i.title}</Title>
          <p>{i.description}</p>
          <ViewButton>
            <Link to="#" onClick={() => getTaskId(i._id)}>
              View
            </Link>
          </ViewButton>
          <UpdateButton>
            <Link to={`/updateTask/${i._id}`}>Update</Link>
          </UpdateButton>

          <DeleteButton>
            <Link to="#" onClick={() => handleDelete(i._id)}>
              Delete
            </Link>
          </DeleteButton>
        </TaskBlock>
      ))}
    </motion.div>
    // <motion.div variants={staggerVariants} initial="hidden" animate="visible">
    //   <TaskBlock variants={item}>
    //     <motion.div>test1</motion.div>
    //   </TaskBlock>

    //   <TaskBlock variants={item}>
    //     <motion.div>test1</motion.div>
    //   </TaskBlock>
    // </motion.div>
  );
};

const mapStateToProps = (state) => ({
  task: state.task.tasks,
});

export default connect(mapStateToProps, {
  deleteTask,
  getTask,
  getTaskId,
  setAlert,
})(Tasks);
