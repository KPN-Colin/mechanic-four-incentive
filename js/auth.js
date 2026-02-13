const msalInstance = new msal.PublicClientApplication(msalConfig);

async function startLoginFlow() {

    showLoadingOverlay();

    try {
        let account = msalInstance.getAllAccounts()[0];

        if (!account) {
            const loginResponse = await msalInstance.loginRedirect(loginRequest);
            return;
        }

        const tokenResponse = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: account
        });

        checkGroupMembership(tokenResponse.accessToken);

    } catch (error) {
        msalInstance.loginRedirect(loginRequest);
    }
}

async function checkGroupMembership(token) {

    const response = await fetch(GRAPH_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    const groups = data.value;

    const isMember = groups.some(group => group.id === REQUIRED_GROUP_ID);

    const userPrincipalName = msalInstance.getAllAccounts()[0].username;

    if (!userPrincipalName.endsWith("@kpn.com")) {
        window.location.href = "no-access.html";
        return;
    }

    if (isMember) {
        window.location.href = "inhoud.html";
    } else {
        window.location.href = "access-denied.html";
    }
}
