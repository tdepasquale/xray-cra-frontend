export interface IUtilityState {
  blogPageNumber: number;
  guidePageNumber: number;
  cardHeight: number;
}

export const utilityInitialState: IUtilityState = {
  blogPageNumber: 1,
  guidePageNumber: 1,
  cardHeight: 1,
};

export interface IUtilityAction {
  type: string;
  payload: number;
}

export enum UtilityActions {
  SET_BLOG_PAGE_NUMBER = "SET_BLOG_PAGE_NUMBER",
  SET_GUIDE_PAGE_NUMBER = "SET_GUIDE_PAGE_NUMBER",
  SET_CARD_HEIGHT = "SET_CARD_HEIGHT",
}

export function utilityReducer(state: IUtilityState, action: IUtilityAction) {
  let updatedUtilityState: IUtilityState = {
    ...state,
  };
  switch (action.type) {
    case UtilityActions.SET_BLOG_PAGE_NUMBER:
      updatedUtilityState.blogPageNumber = action.payload;
      return updatedUtilityState;
    case UtilityActions.SET_GUIDE_PAGE_NUMBER:
      updatedUtilityState.guidePageNumber = action.payload;
      return updatedUtilityState;
    case UtilityActions.SET_CARD_HEIGHT:
      updatedUtilityState.cardHeight = action.payload;
      return updatedUtilityState;
    default:
      return state;
  }
}

export function setBlogPageAction(blogPageNumber: number) {
  const action: IUtilityAction = {
    type: UtilityActions.SET_BLOG_PAGE_NUMBER,
    payload: blogPageNumber,
  };

  return action;
}

export function setGuidePageAction(guidePageNumber: number) {
  const action: IUtilityAction = {
    type: UtilityActions.SET_GUIDE_PAGE_NUMBER,
    payload: guidePageNumber,
  };

  return action;
}

export function setCardHeightAction(cardHeight: number) {
  const action: IUtilityAction = {
    type: UtilityActions.SET_CARD_HEIGHT,
    payload: cardHeight,
  };

  return action;
}
