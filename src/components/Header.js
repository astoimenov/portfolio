import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: #fbfcff;
    background-image: url("${props => props.theme.bgPattern}");
    display: flex;
    position: relative;
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidths.general};
  padding: 3rem 1.0875rem 10rem 1.0875rem;
  color: ${props => props.theme.colors.secondary};
  text-align: center;
  width: 100%;
`;

const Avatar = styled.div`
  height: 125px;
  width: 125px;
  margin: 0 auto;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;

  img {
    border-radius: 50%;
  }
`;

const Name = styled.h1`
  margin: 1rem 0 0.25rem 0;
  color: ${props => props.theme.colors.color};
`;

const Location = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialMedia = styled.div`
  margin-top: 2rem;

  a {
    margin: 0 0.3rem;
    transition: all ease-in-out 0.5s;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Navigation = styled.nav`
  float: right;
`;

const Header = ({ avatar, name, location, socialMedia }) => (
  <Wrapper>
    <Content>
      {/* <Navigation> */}
      {/* <Link to="/development">Development</Link> */}
      {/* </Navigation> */}
      <Avatar>
        <img src={avatar} alt={name}/>
      </Avatar>
      <Name>{name}</Name>
      <Location>{location}</Location>
      <SocialMedia>
        {socialMedia.map(social => (
          <a key={social.name} href={social.url} rel="noopener noreferrer" target="_blank">
            {social.name}
          </a>
        ))}
      </SocialMedia>
    </Content>
  </Wrapper>
);

export default Header;
