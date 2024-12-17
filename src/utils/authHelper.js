const TOKEN_KEY = 'authToken';

const authHelper = {
  setToken: (token) => {
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  getToken: () => {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  clearToken: () => {
    sessionStorage.removeItem(TOKEN_KEY);
  },

  getUser: () => {
    const token = authHelper.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!authHelper.getToken();
  },
};

export default authHelper;
