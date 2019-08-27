import {
  SET_USER,
  RESET
} from '../constants';


export function setUserData(data) {
  return {
    type: SET_USER,
    data,
  };
}
export function logout() {
  return {
    type: RESET,
  };
}