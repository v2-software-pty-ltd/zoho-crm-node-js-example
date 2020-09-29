const ZCRMRestClient = require('zcrmsdk');

const configJson = {
    "client_id": process.env.SELF_CLIENT_CLIENT_ID, //mandatory
    "client_secret": process.env.SELF_CLIENT_CLIENT_SECRET, //mandatory
    "redirect_url": "http:/localhost:3000", //mandatory
    "user_identifier": process.env.ADMIN_EMAIL_ADDRESS,
    "base_url": "www.zohoapis.com", //optional ,"www.zohoapis.com" is default value
    "iamurl": "accounts.zoho.com", //optional ,"accounts.zoho.com" is default value
    "version": "v2.1", //optional ,"v2" is default value
    "tokenmanagement": `${__dirname}/tokenManagement.js`
}

async function initialiseClient() {
    await ZCRMRestClient.initialize(configJson);
}

async function bootstrapOauthFromSelfClient() {
    await initialiseClient();
    //do whatever required after initialize
    grant_token = process.env.SELF_CLIENT_TEMPORARY_GRANT_TOKEN;
    user_identifier = process.env.ADMIN_EMAIL_ADDRESS;

    const authResponse = await ZCRMRestClient.generateAuthTokens(user_identifier, grant_token);

    console.log("access token :" + authResponse.access_token);
    console.log("refresh token :" + authResponse.refresh_token);
    console.log("expires in :" + authResponse.expires_in);
}

async function testSDK() {
    await initialiseClient();
    const moduleResponse = await ZCRMRestClient.API.SETTINGS.getModules({});
    console.log(moduleResponse);

        // Response of the API call is returned in the 'body'

        // Modules data value available as JSON Array of the 'modules' key of the JSON response
        // Each JSON object of the array corresponds to a module
        // By iterating the JSON objects of the array, individual module details can be obtained

    const { modules } = JSON.parse(moduleResponse.body);

        // Iterating the JSON array
    for (module in modules) {
        const moduleData = modules[module];

        // For obtaining all the fields of the organization details, use the value of 'module_data' as such
        console.log(moduleData);

        // For obtaining a particular field, use module_data.<api-name of field>
        // Sample API names: id, api_name
        console.log(moduleData.api_name);
    }
}

testSDK();
