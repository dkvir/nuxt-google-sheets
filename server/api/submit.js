import { google } from "googleapis";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    projectId: process.env.GOOGLE_PROJECT_ID,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = process.env.SPREAD_SHEET_ID;
  const range = "Sheet1!A2:D"; // Adjust range if your sheet is named differently

  const values = [
    [body.name, body.lastName, body.email, body.subscribe ? "Yes" : "No"],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  });

  return { success: true };
});
