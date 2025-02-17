export interface Language {
  code: string;
  englishLabel: string;
  nativeLabel: string;
  status: "enabled" | "pending" | "disabled";
}
