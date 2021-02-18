import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Flex } from '../../elements/blocks';
import { UpdateButton } from '../../elements/inputs';
import Alert from '../alert';
import Tasks from './tasks';
import Task from './task';

const Dashboard = () => {
  return (
    <Fragment>
      <Alert></Alert>
      <Flex className="dashboard-flex">
        <div>
          <Task></Task>
          <UpdateButton>
            <Link to="/addTask">Add Task</Link>
          </UpdateButton>
        </div>
        <div>
          <Tasks></Tasks>
        </div>
      </Flex>
    </Fragment>
  );
};

export default Dashboard;
