export const LIGHT_MODE = "light_mode";
export const DARK_MODE = "dark_mode";
export const CHANGE_MODE = "change_mode";
export const CURRENT_USER_THEME = "current_user_theme";
export const CLEAR_FIELDS = "clear_fields";

const initialState = {
    isDark: false
};

export function lightModeAction() {
    return {
      type: LIGHT_MODE,
    };
}

export function darkModeAction() {
    return {
      type: DARK_MODE,
    };
}

export function changeModeAction() {
    return {
      type: CHANGE_MODE,
    };
}

export function setCurrentUserTheme() {
    return { type: CURRENT_USER_THEME };
}

export function clearFields() {
    return { type: CLEAR_FIELDS };
}

export default function accountPrefReducer(state = initialState, action) {
    switch (action.type) {
        case CURRENT_USER_THEME:
            return { ...state, isDark: action.payload };
        case CHANGE_MODE:
            return { ...state, isDark: !state.isDark };
        case CLEAR_FIELDS:
            return { ...state, isDark: false };
        default:
            return state;
    }
}