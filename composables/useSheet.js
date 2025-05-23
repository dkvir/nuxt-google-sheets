let sheetRange = "Sheet1!A1:D200";

const getVars = () => {
  const SPREAD_SHEET_ID = useRuntimeConfig().public.SPREAD_SHEET_ID;
  const GOOGLE_API_KEY = useRuntimeConfig().public.GOOGLE_API_KEY;

  return { SPREAD_SHEET_ID, GOOGLE_API_KEY };
};

export async function allRows() {
  const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${sheetRange}?key=${GOOGLE_API_KEY}`;
  return await useFetch(url);
}

export async function singleRow(row) {
  const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();

  const rowRange = `Sheet1!A${row}:D${row}`;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${rowRange}?key=${GOOGLE_API_KEY}`;
  return await useFetch(url);
}

export async function appendRow(rowData) {
  const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();

  // Format the data for the Sheets API
  const values = [
    [
      rowData.name,
      rowData.lastName,
      rowData.email,
      rowData.subscribe ? "Yes" : "No",
    ],
  ];

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/Sheet1!A:D:append?valueInputOption=USER_ENTERED&key=${GOOGLE_API_KEY}`;

  return await useFetch(url, {
    method: "POST",
    body: {
      values,
    },
  });
}
