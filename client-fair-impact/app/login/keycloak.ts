import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8090/",
  realm: "FairAware",
  clientId: "nest-app",
});

export default keycloak;
