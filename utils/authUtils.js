export async function checkLogin(credentials) {
  const response = await fetch(
    new URL(process.env.CUSTOM_LOGIN_ROUTE, process.env.EXPRESS_BACKEND_URL),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(credentials),
    }
  );
  if (response.status === 401) return null;

  const data = await response.json();
  return data;
}

export function setAccessToken(token) {
  sessionStorage.setItem("jwt", token);
}

export function getAccessToken() {
  return sessionStorage.getItem("jwt");
}

// References:
// https://blog.logrocket.com/password-hashing-node-js-bcrypt
// https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#basics-login
