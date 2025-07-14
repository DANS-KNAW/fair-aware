const oidcConfig = {
  authority: "http://localhost:8090/realms/FairAware",
  client_id: "nest-app",
  redirect_uri: "http://localhost:3000/login",
  // somehow these are undefined in the environment variables
  //authority: `${process.env.KEYCLOAK_AUTH_SERVER_URL ?? "http://localhost:8090"}/realms/${process.env.KEYCLOAK_REALM ?? "FairAware"}`,
  //client_id: process.env.KEYCLOAK_CLIENT_ID ?? "nest-app",
  //redirect_uri: `${process.env.NEXT_PUBLIC_API_HOST ?? "http://localhost:3000"}/login`,
  scope: "openid profile",
};
export default oidcConfig;
