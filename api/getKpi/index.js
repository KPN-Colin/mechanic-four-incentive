module.exports = async function (context, req) {
    const user = context.bindingData.clientPrincipal;

    if (!user) {
        context.res = { status: 401 };
        return;
    }

    const userName = user.userDetails;

    // Hier later SharePoint filtering toevoegen

    context.res = {
        body: {
            message: `KPI data voor ${userName}`
        }
    };
};
