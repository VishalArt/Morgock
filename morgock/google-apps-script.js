// ============================================================
// MORGOCK.AI — Master Google Apps Script
// Go to script.google.com → New Project → paste this
// Deploy → New Deployment → Web App
//   Execute as: Me
//   Who has access: Anyone
// ============================================================

var SHEET_IDS = {
  demo:    "189LsIivNJ_ifcXyJfbygeLwn-rdryKwu_bquyC6YCfE",
  contact: "1_P4ZQRtyjyD3sPdCKUTEEXccg1O3Bzzi1og6DpBwvYI",
  signin:  "1yYHi_qpqQxp1hMtonjiJWZDXNGubcv04QAVMIOkdCrg",
  // ── NEW: Intern records sheet (create a new Google Sheet and paste its ID here)
  interns: "PASTE_YOUR_INTERN_SHEET_ID_HERE"
};

var HEADERS = {
  demo:    ["Timestamp","First Name","Last Name","Email","Company","Company Size","Industry","Use Case"],
  contact: ["Timestamp","First Name","Last Name","Email","Company","Interest","Message"],
  signin:  ["Timestamp","Email","Login Method"],
  careers: ["Timestamp","Full Name","Email","Phone","Role Applied","Experience","LinkedIn","Portfolio","Current Company","Notice Period","Cover Note"],
  // ── Intern master records (YOU fill these manually in the sheet)
  interns: ["Unique ID","Full Name","Email","Role","Department","Join Date","End Date","Duration","Status"]
};

var TAB_NAMES = {
  demo:    "Demo Requests",
  contact: "Contact & Expert",
  signin:  "Sign Ups & Logins",
  careers: "Career Applications",
  interns: "Intern Records"
};

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var formType = data.formType || "contact";

    // ── VERIFICATION REQUEST ──
    if (formType === "verify") {
      return handleVerify(data);
    }

    // ── NORMAL FORM SUBMISSION ──
    var sheetId = SHEET_IDS[formType] || SHEET_IDS["contact"];
    var ss = SpreadsheetApp.openById(sheetId);
    var tabName = TAB_NAMES[formType] || "Form Data";
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) sheet = ss.insertSheet(tabName);

    if (sheet.getLastRow() === 0) {
      var h = HEADERS[formType] || HEADERS["contact"];
      sheet.appendRow(h);
      var hRange = sheet.getRange(1, 1, 1, h.length);
      hRange.setBackground("#1565C0");
      hRange.setFontColor("#FFFFFF");
      hRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var ts = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");
    var row;

    if (formType === "demo") {
      row = [ts, data.firstName, data.lastName, data.email, data.company, data.companySize, data.industry, data.useCase];
    } else if (formType === "contact") {
      row = [ts, data.firstName, data.lastName, data.email, data.company, data.interest, data.message];
    } else if (formType === "signin") {
      row = [ts, data.email, data.loginMethod || "Email/Password"];
    } else if (formType === "careers") {
      row = [ts, data.name, data.email, data.phone, data.role, data.experience, data.linkedin, data.portfolio, data.current, data.notice, data.coverNote];
    } else {
      row = [ts, JSON.stringify(data)];
    }

    sheet.appendRow(row);
    sheet.autoResizeColumns(1, sheet.getLastColumn());

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", form: formType }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── INTERN VERIFICATION HANDLER ──
function handleVerify(data) {
  try {
    var uid   = (data.uid   || "").toString().trim().toUpperCase();
    var email = (data.email || "").toString().trim().toLowerCase();
    var date  = (data.date  || "").toString().trim();

    var ss    = SpreadsheetApp.openById(SHEET_IDS["interns"]);
    var sheet = ss.getSheetByName(TAB_NAMES["interns"]);

    if (!sheet) {
      // Auto-create the sheet with headers if it doesn't exist
      sheet = ss.insertSheet(TAB_NAMES["interns"]);
      sheet.appendRow(HEADERS["interns"]);
      var hRange = sheet.getRange(1, 1, 1, HEADERS["interns"].length);
      hRange.setBackground("#1565C0");
      hRange.setFontColor("#FFFFFF");
      hRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
      return ContentService
        .createTextOutput(JSON.stringify({ status: "not_found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var rows = sheet.getDataRange().getValues();
    // Row 0 = headers: [Unique ID, Full Name, Email, Role, Department, Join Date, End Date, Duration, Status]

    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var rowUID   = (row[0] || "").toString().trim().toUpperCase();
      var rowEmail = (row[2] || "").toString().trim().toLowerCase();
      var rowJoin  = (row[5] || "").toString().trim();

      // Match all 3: UID + Email + Join Date
      if (rowUID === uid && rowEmail === email) {
        // Also verify date (flexible format match)
        var joinMatch = rowJoin.replace(/\//g,'-').includes(date) ||
                        date.replace(/\//g,'-').includes(rowJoin.replace(/\//g,'-')) ||
                        rowJoin === date;

        if (joinMatch) {
          return ContentService
            .createTextOutput(JSON.stringify({
              status: "found",
              intern: {
                uid:      row[0],
                name:     row[1],
                email:    row[2],
                role:     row[3],
                dept:     row[4],
                joinDate: row[5],
                endDate:  row[6],
                duration: row[7],
                status:   row[8] || "Active"
              }
            }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "not_found" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("MorGock.ai Form API is live — Founded by Vishal Gautam")
    .setMimeType(ContentService.MimeType.TEXT);
}
