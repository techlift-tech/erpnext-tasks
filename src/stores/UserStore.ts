const types = {
    LOGOUT: 'LOGOUT',
    PARMS: 'SET_PARMS',
    LOGIN: 'LOGIN_SUCCESS',
    FINISH_INTRO: 'FINISH_INTRO'
};

export const actions = {
    setParms: (parms) => {
        return { type: types.PARMS, parms };
    },
    login: (user) => {
        return { type: types.LOGIN, user };
    },
    logout() {
        return { type: types.LOGOUT };
    },
    finishIntro() {
        return { type: types.FINISH_INTRO };
    }
};

const initialState = {
    user: null,
    parms: null,
    finishIntro: null
};

export const reducer = (state = initialState, action) => {
    const { type, user, parms } = action;
    switch (type) {
        case types.LOGOUT:
            return Object.assign({}, initialState);
        case types.PARMS:
            return { ...state, parms };
        case types.LOGIN:
            return { ...state, user };
        case types.FINISH_INTRO:
            return { ...state, finishIntro: true };
        default:
            return state;
    }
};