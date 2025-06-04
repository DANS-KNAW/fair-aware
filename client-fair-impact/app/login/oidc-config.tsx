const oidcConfig = {
  authority: "http://localhost:8090/realms/FairAware",
  client_id: "nest-app",
  redirect_uri: "http://localhost:3000/login",
  scope: "openid profile",
};
export default oidcConfig;
