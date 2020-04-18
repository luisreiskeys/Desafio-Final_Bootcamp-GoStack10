import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/fastfeet-logo.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(signOut());
  }
  const profile = useSelector((state) => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <NavLink
            to="/deliveries"
            activeStyle={{
              fontWeight: 'bold',
              color: '#444',
            }}
          >
            ENCOMENDAS
          </NavLink>
          <NavLink
            to="/deliveryman"
            activeStyle={{
              fontWeight: 'bold',
              color: '#444',
            }}
          >
            ENTREGADORES
          </NavLink>
          <NavLink
            to="/recipients"
            activeStyle={{
              fontWeight: 'bold',
              color: '#444',
            }}
          >
            DESTINATÁRIOS
          </NavLink>
          <NavLink
            to="/problems"
            activeStyle={{
              fontWeight: 'bold',
              color: '#444',
            }}
          >
            PROBLEMAS
          </NavLink>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleLogout}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
