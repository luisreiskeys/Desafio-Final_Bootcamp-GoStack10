import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {format, parseISO} from 'date-fns';

import {signOut} from '../../store/modules/auth/actions';

import {Container, Avatar, Info, Label, BigText, SubmitButton} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  return (
    <Container>
      <Avatar
        source={{
          uri: profile.avatar
            ? profile.avatar.url
            : `https://ui-avatars.com/api/?color=A28FD0&background=F4EFFC&bold=true&format=png&size=140&rounded=true&name=${profile.name}`,
        }}
      />
      <Info>
        <Label>Nome Completo</Label>
        <BigText>{profile.name}</BigText>

        <Label>Email</Label>
        <BigText>{profile.email}</BigText>

        <Label>Data de cadastro</Label>
        <BigText>
          {format(parseISO(profile.created_at), "dd'/'MM'/'yyyy")}
        </BigText>
      </Info>
      <SubmitButton onPress={() => dispatch(signOut())}>Logout</SubmitButton>
    </Container>
  );
}
