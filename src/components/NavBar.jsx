import styled from 'styled-components'


const Nav = styled.nav`
  position: fixed;
  text-align: center;
  background-color: #282828;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 100%;
  z-index: ${props => props.zindex};
`

const NavUl = styled.ul`
  display: inline-block;
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const NavLi = styled.li`
  float: left;
  margin: 0;
  paddin: 0;
  border-radius: 8px;
`

const NavA = styled.a`
  color: white;
  display: block;
  padding: 0.5em 1em;
  border-radius: 8px;
  margin: 1em;
  position: relative;
  text-decoration: none;

  &:hover {
    color: white;
    background-color: #555;
  }
`

function NavBar({ entries, zindex }) {

  let navBarItems = entries.map((entry, index) => {
    return <NavBarItem title={entry.title} targetId={entry.targetId} key={index}></NavBarItem>
  })

  return (
    <Nav zindex={zindex}>
      <NavUl>
        {navBarItems}
      </NavUl>
    </Nav>
  );
}

function NavBarItem({ title, targetId }) {
  return (
    <NavLi key={title}>
      <NavA href={"#"+targetId}>
        {title}
      </NavA>
    </NavLi>
  );
}

export default NavBar;