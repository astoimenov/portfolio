import React from 'react';
import styled from 'styled-components';

const Content = styled.p`
    color: ${props => props.theme.colors.secondary};
    padding: 0 ${props => props.theme.contentPadding};
    text-align: center;
`;

const Footer = () => <Content>&copy; 2018 by AStoimenov</Content>;

export default Footer;
