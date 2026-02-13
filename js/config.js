const msalConfig = {
    auth: {
        clientId: "CLIENT_ID_HIER",
        authority: "https://login.microsoftonline.com/TENANT_ID_HIER",
        redirectUri: window.location.origin + "/mechanic4/index.html"
    }
};

const loginRequest = {
    scopes: ["User.Read", "GroupMember.Read.All"]
};

const GRAPH_ENDPOINT = "https://graph.microsoft.com/v1.0/me/memberOf";

const REQUIRED_GROUP_ID = "GROUP_ID_HIER";
