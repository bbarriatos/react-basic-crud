import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Flex = styled(motion.div)`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0 1em;
`;

export const FormBlock = styled.div`
  width: 450px;
  margin: 0 auto;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 2em 1.5em;

  form a {
    color: #0091ea;
    text-decoration: none;
  }

  form strong {
    text-align: right;
    display: block;
    color: #6a6a6a;
    font-size: 14px;
  }

  form .signup strong {
    text-align: center;
    margin-top: 2em;
  }
`;

export const TaskBlock = styled(motion.div)`
  display: block;
  background: rgba(255, 255, 255, 0.8);
  padding: 2em;
  margin-bottom: 1em;
`;

export const TaskView = styled(motion.div)`
  display: block;
  background: rgba(255, 255, 255, 0.8);
  padding: 2em;
  margin: 0 1em 2em;
`;
