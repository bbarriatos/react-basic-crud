import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Title = styled(motion.h1)`
  text-align: ${(props) => props.alignment || 'center'};
  color: ${(props) => props.color || '#e65100'};
  text-shadow: 0px 1px 4px rgba(254, 94, 0, 0.7);
  text-transform: ${(props) => props.textTransform || 'none'};
`;

export const HeaderTitle = styled.h2`
  text-shadow: 0px 1px 4px rgba(254, 94, 0, 0.7);
  text-transform: ${(props) => props.textTransform || 'none'};
  text-align: ${(props) => props.alignment || 'left'};
`;

export const Wrapper = styled(motion.section)`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
`;
