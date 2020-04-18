import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';
import { Container, ActionList } from './styles';

export default function ActionsPopUp({ children }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [popup, setPopup] = useState(false);

  function togglePopUp(e) {
    setPopup(!popup);
    setCoords({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
  }

  function close() {
    setPopup(false);
  }
  return (
    <Container>
      <button type="button" onClick={(e) => togglePopUp(e)}>
        <MdMoreHoriz color="#C6C6C6" size={20} />
      </button>
      <ActionList onClick={close} visible={popup} coords={coords}>
        {children}
      </ActionList>
    </Container>
  );
}

ActionsPopUp.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

ActionsPopUp.defaultProps = {
  children: null,
};
