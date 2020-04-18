export function showToast(type, msg) {
  return {
    type: '@toast/SHOW',
    payload: {type, msg},
  };
}

export function resetToast() {
  return {
    type: '@toast/RESET',
  };
}
