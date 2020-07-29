import { IUser } from "../models/user";

export interface IState {
  user: IUser | null;
  token: string | null;
}

export const userInitialState: IState = {
  user: null,
  token: window.sessionStorage.getItem("jwt"),
};

export interface IAction {
  type: string;
  payload: IState;
}

const SETUSER = "SETUSER";
const SETTOKEN = "SETTOKEN";
const LOGOUT = "LOGOUT";

export function userReducer(state: IState, action: IAction) {
  switch (action.type) {
    case SETUSER:
      let updatedUserState: IState = {
        user: action.payload.user,
        token: state.token,
      };
      return updatedUserState;
    case SETTOKEN:
      let updatedTokenState: IState = {
        user: state.user,
        token: action.payload.token,
      };
      return updatedTokenState;
    case LOGOUT:
      let logoutState: IState = {
        user: null,
        token: null,
      };
      return logoutState;
    default:
      return state;
  }
}

export function setUserAction(user: IUser | null) {
  const action: IAction = {
    type: SETUSER,
    payload: { user: user, token: null },
  };

  return action;
}

export function setTokenAction(token: string) {
  const action: IAction = {
    type: SETTOKEN,
    payload: { user: null, token: token },
  };

  return action;
}

export function logoutAction() {
  const action: IAction = {
    type: LOGOUT,
    payload: { user: null, token: null },
  };

  return action;
}
