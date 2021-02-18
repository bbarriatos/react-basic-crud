import React from 'react';
import { connect } from 'react-redux';
import { TaskView } from '../../elements/blocks';
import { Title } from '../../elements/texts';

const taskContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Task = ({ task }) => {
  if (task === null || task.length === 0) {
    return 'Click to view tasks';
  } else {
    return (
      <TaskView variants={taskContainer} initial="hidden" animate="visible">
        <Title alignment="left">{task.title}</Title>
        <p>{task.description}</p>
      </TaskView>
    );
  }
};

const mapStateToProps = (state) => ({
  task: state.task.task,
});

export default connect(mapStateToProps)(Task);
