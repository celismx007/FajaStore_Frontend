
export const authServiceToken = {
    getToken() {
      return localStorage.getItem('token');
    },
    setToken(token) {
      return localStorage.setItem('token', token);
    },
    removeToken() {
      return localStorage.removeItem('token');
    }
}

export function getHeaderRequest() {
    const token = authServiceToken.getToken() || "";
    const header = {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        'Cache-Control': 'no-cache'
      },
    };
    return header;
  }
  
  export function getHeaderRequestMultiPartFormData() {
    const token = authServiceToken.getToken() || "";
    const header = {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        'Cache-Control': 'no-cache'
      },
    };
    return header;
  }

  export function getUserIdOfLocalStorage() {
    const user = JSON.parse(localStorage.getItem('user'));
    var userId = user?.user_id || null;
    return userId;
  }
  
  export function getUserRoleOfLocalStorage() {
    var user = JSON.parse(localStorage.getItem('user'));
    var userRole = user?.role;
    return userRole;
  }
  
  export function userNameOfLocalStorage() {
    var user = JSON.parse(localStorage.getItem('user'));
    var userName = user?.username;
    return userName;
  }
  