function signinsKQL() {
  const emailInput = document.getElementById("signin_email").value.trim();
  const ipInput = document.getElementById("IP_address").value.trim();
  const numOfDays = document.getElementById("numOfDays").value.trim();
  const authReq = document.getElementById("authReq").value;
  const signinType = document.getElementById("signinType").value;
  const conditionalAccessStatus = document.getElementById("conditionalAccessStatus").value;
  const appDisplayName = document.getElementById("appDisplayName").value.trim();

  let filters = "";

  // Email filter
  if (emailInput) {
    const emailList = emailInput
      .split(",")
      .map(e => e.trim())
      .filter(Boolean);

    if (emailList.length) {
      const emailDynamic = emailList.map(e => `'${e}'`).join(", ");
      filters += `\n| where UserPrincipalName in~ (${emailDynamic})`;
    }
  }

  // IP filter
  if (ipInput) {
    const ipList = ipInput
      .split(",")
      .map(ip => ip.trim())
      .filter(Boolean);

    if (ipList.length) {
      const ipDynamic = ipList.map(ip => `'${ip}'`).join(", ");
      filters += `\n| where IPAddress in (${ipDynamic})`;
    }
  }

  // Other filters
  if (numOfDays.length) {
    filters += `\n| where TimeGenerated > ago(${numOfDays}d)`;
  }
  if (authReq !== "-") {
    filters += `\n| where AuthenticationRequirement contains "${authReq}"`;
  }
  if (signinType !== "-") {
    filters += `\n| where Type == "${signinType}"`;
  }
  if (conditionalAccessStatus !== "-") {
    filters += `\n| where ConditionalAccessStatus == "${conditionalAccessStatus}"`;
  }
  if (appDisplayName.length) {
    filters += `\n| where AppDisplayName contains "${appDisplayName}"`;
  }

  // KQL Query
  const kql_query_1 = `let aadSignin = SigninLogs;
let aadNonInt = AADNonInteractiveUserSignInLogs;
let allSignins = union isfuzzy=true aadSignin, aadNonInt;
allSignins${filters}
| summarize by 
    TimeGenerated, 
    UserPrincipalName, 
    Type, 
    IPAddress, 
    AuthenticationRequirement, 
    AuthenticationDetails, 
    Status = coalesce(tostring(Status_dynamic), tostring(Status_string)), 
    MfaDetail = coalesce(tostring(MfaDetail_dynamic), tostring(MfaDetail_string)), 
    ConditionalAccessStatus, 
    AppDisplayName, 
    DeviceDetail = coalesce(tostring(DeviceDetail_dynamic), tostring(DeviceDetail_string)), 
    LocationDetails = coalesce(tostring(LocationDetails_dynamic), tostring(LocationDetails_string)), 
    UserAgent`;

  document.getElementById("outputText").value = kql_query_1;
}

function auditKQL() {
  const emailInput = document.getElementById("audit_email").value.trim();

  let filters = "";

  if (emailInput.length) {
    filters += `\n| where tostring(TargetResource.userPrincipalName) in~ ("${emailInput}")`;
  }

  // KQL Query
  const kql_query_1 = `AuditLogs
| where TimeGenerated > ago(30d)
| mv-expand TargetResource = TargetResources${filters}
| extend AccountUPN = tostring(TargetResource.userPrincipalName)
| summarize Auditlogs = make_list(pack("TimeGenerated", TimeGenerated, "OperationName", OperationName, "Category", Category, "Identity", Identity, "ResultReason", ResultReason, "Result", Result, "InitiatedBy", tostring(InitiatedBy) )) by AccountUPN;`;

  document.getElementById("outputText").value = kql_query_1;
}

function ipEventsKQL() {
  const ipInput = document.getElementById("ipEvent_IP_addresses").value.trim();

  let filters = "";

  // IP filter
  if (ipInput) {
    const ipList = ipInput
      .split(",")
      .map(ip => ip.trim())
      .filter(Boolean);

    if (ipList.length) {
      const ipDynamic = ipList.map(ip => `'${ip}'`).join(", ");
      filters += `let malicious_ips = dynamic([${ipDynamic}]);`;
    }
  }

  // KQL Query
  const kql_query_1 = `${filters} 
search in (DeviceNetworkEvents, DeviceEvents, CommonSecurityLog, Alert, DeviceFileEvents, OfficeActivity, SecurityIncident, SigninLogs, Syslog, SecurityEvent, WindowsFirewall, AADManagedIdentitySignInLogs, AADNonInteractiveUserSignInLogs) 
TimeGenerated between (ago(7d) .. now()) 
| where RemoteIP in (malicious_ips) or SourceIP in (malicious_ips) or IPAddress in (malicious_ips) or Client_IPAddress in (malicious_ips) or ClientIP in (malicious_ips) or DestinationIP in (malicious_ips) or MaliciousIP in (malicious_ips) or HostIP in (malicious_ips)`;

  document.getElementById("outputText").value = kql_query_1;
}

function urlEventsKQL() {
  const urlInput = document.getElementById("urlEvents_URL").value.trim();

  let filters = "";

  // IP filter
  if (urlInput) {
    const urlList = urlInput
      .split(",")
      .map(url => url.trim())
      .filter(Boolean);

    if (urlList.length) {
      const urlDynamic = urlList.map(url => `'${url}'`).join(", ");
      filters += `\n| where RemoteUrl has_any (${urlDynamic})`;
    }
  }

  // KQL Query
  const kql_query_1 = `DeviceNetworkEvents${filters}`;

  document.getElementById("outputText").value = kql_query_1;
}

function emailEventsKQL() {
  const senderEmailInput = document.getElementById("emailEvents_senderEmail").value.trim();
  const recipientEmailInput = document.getElementById("emailEvents_recipientEmail").value.trim();
  const subjectInput = document.getElementById("emailEvents_subject").value.trim();

  let variables = "";
  let filters = "";

  // Sender email filter
  if (senderEmailInput) {
    const senderEmailList = senderEmailInput
      .split(",")
      .map(e => e.trim())
      .filter(Boolean);

    if (senderEmailList.length) {
      const senderEmailDynamic = senderEmailList.map(e => `'${e}'`).join(", ");
      variables += `\nlet senderEmail = dynamic([${senderEmailDynamic}]);`;
      filters += `\n| where SenderFromAddress in~ (senderEmail) or SenderMailFromAddress in~ (senderEmail)`;
    }
  }

  // Recipient email filter
  if (recipientEmailInput) {
    const recipientEmailList = recipientEmailInput
      .split(",")
      .map(e => e.trim())
      .filter(Boolean);

    if (recipientEmailList.length) {
      const recipientEmailDynamic = recipientEmailList.map(e => `'${e}'`).join(", ");
      variables += `\nlet recipientEmail = dynamic([${recipientEmailDynamic}]);`;
      filters += `\n| where recipientFromAddress in~ (recipientEmail) or recipientMailFromAddress in~ (recipientEmail)`;
    }
  }

  // Subject filter
  if (subjectInput) {
    filters += `\n| where Subject contains "${subjectInput}"`;
  }

  // KQL Query
  const kql_query_1 = `//${variables}
EmailEvents${filters}
| where TimeGenerated > ago(7d)`;

  document.getElementById("outputText").value = kql_query_1;
}

// Function to load saved values for the textboxes
window.onload = function() {
  const savedValue_signin_email = localStorage.getItem('koi_signin_email');
  const savedValue_IP_address = localStorage.getItem('koi_IP_address');
  const savedValue_audit_email = localStorage.getItem('koi_audit_email');

  if (savedValue_signin_email) {
    document.getElementById('signin_email').value = savedValue_signin_email;
  }
  if (savedValue_IP_address) {
    document.getElementById('IP_address').value = savedValue_IP_address;
  }
  if (savedValue_audit_email) {
    document.getElementById('audit_email').value = savedValue_audit_email;
  }
};

  // Save the value of textboxes whenever it changes
  document.getElementById('signin_email').addEventListener('input', function() {
    const value = this.value;
    localStorage.setItem('koi_signin_email', value);
  });
  document.getElementById('IP_address').addEventListener('input', function() {
    const value = this.value;
    localStorage.setItem('koi_IP_address', value);
  });
  document.getElementById('audit_email').addEventListener('input', function() {
    const value = this.value;
    localStorage.setItem('koi_audit_email', value);
  });