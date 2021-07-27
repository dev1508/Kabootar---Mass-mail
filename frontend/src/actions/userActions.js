import axios from "axios";

export const login = (code, googleId, profile) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/auth/google",
      {
        code,
        googleId,
        profile,
      },
      config
    );

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: "USER_LOGOUT",
    payload: {},
  });
  localStorage.removeItem("userInfo");
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DETAILS_REQUEST",
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/user/${id}`, config);
    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_REQUEST",
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",

        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/user/profile`, user, config);
    dispatch({
      type: "USER_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};