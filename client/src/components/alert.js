import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const notificationVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    scaleX: 0,
    opacity: 0,
  },
};

const Alert = ({ alert: { alert }, loading }) => {
  const Notification = styled(motion.div)`
    color: #fff;
    background: ${(props) =>
      props.theme === 'primary' ? '#81c784' : '#ff8a65'};
    text-align: center;
    margin-bottom: 2em;
    padding: 0.5em 1em;
  `;

  return !loading
    ? alert.map((alerts) => (
        <Notification
          variants={notificationVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          theme={alerts.alertType}
        >
          {alerts.msg}
        </Notification>
      ))
    : '';
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
