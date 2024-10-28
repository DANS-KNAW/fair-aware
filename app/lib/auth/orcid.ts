export interface OrcidAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  sandbox?: boolean;
}

export class OrcidAuthService {
  private config: OrcidAuthConfig;
  private baseUrl: string;

  constructor(config: OrcidAuthConfig) {
    this.config = config;
    this.baseUrl =
      config.sandbox !== false
        ? "https://sandbox.orcid.org"
        : "https://orcid.org";
  }

  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: "code",
      scope: "/authenticate",
      redirect_uri: this.config.redirectUri + "/api/auth/callback",
    });

    return `${this.baseUrl}/oauth/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string) {
    try {
      const response = await fetch(`${this.baseUrl}/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          grant_type: "authorization_code",
          code,
          redirect_uri: this.config.redirectUri + "/api/auth/callback",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to exchange code for token");
      }

      return response.json();
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      throw error;
    }
  }

  async verifyToken(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/oauth/token/status`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}
