import React from 'react';
import { connect } from 'react-redux';
import { Wrapper, HeaderTitle } from '../elements/texts';
import { motion } from 'framer-motion';
import { Button } from '../elements/inputs';
import { logout } from '../actions/auth';

const headerVariants = {
  hidden: {
    y: '-300px',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};
const Header = ({ logout, auth: { user } }) => {
  return (
    user && (
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <Wrapper className="wrapper">
          <div>
            <HeaderTitle>{user.email}</HeaderTitle>
          </div>
          <div>
            <Button onClick={logout} size="30%">
              Log Out
            </Button>
          </div>
        </Wrapper>
      </motion.header>
    )
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
