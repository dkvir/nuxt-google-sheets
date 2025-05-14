// https://nuxt.com/docs/guide/directory-structure/server
import { google } from "googleapis";

export default defineEventHandler(async (event) => {
  try {
    // Get form data from the request
    const body = await readBody(event);

    // Get environment variables
    const config = useRuntimeConfig();
    const SPREAD_SHEET_ID = config.public.SPREAD_SHEET_ID;
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = config.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = config.GOOGLE_PRIVATE_KEY;

    // Format the data for the Sheets API
    const values = [
      [body.name, body.lastName, body.email, body.subscribe ? "Yes" : "No"],
    ];

    // Set up JWT client with service account credentials
    const jwtClient = new google.auth.JWT(
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      GOOGLE_PRIVATE_KEY,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    // Authorize the client
    await jwtClient.authorize();

    // Create Google Sheets API client with authorized JWT client
    const sheets = google.sheets({
      version: "v4",
      auth: jwtClient,
    });

    // Append values to the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREAD_SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return {
      success: true,
      message: "Data added successfully",
      result: response.data,
    };
  } catch (error) {
    console.error("Error appending to sheet:", error);

    return {
      success: false,
      message: error.message || "Failed to append data to sheet",
      error: error.toString(),
    };
  }
});
