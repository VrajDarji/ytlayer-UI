import { google } from "googleapis";
export const oauth = new google.auth.OAuth2({
  redirectUri: "http://localhost:3000/api/auth/callback/google",
});
export const youtubeAnalytics = google.youtubeAnalytics({
  auth: oauth,
  version: "v2",
});
export const youtube = google.youtube({
  version: "v3",
  auth: oauth,
});
