## Overview
This is an Web interface and Rest API that lets you send email.

## Implementation
The solution delivered here is a Node Express project with Vue framework used for user interface.
It is tested for multiple recipients as well as email provider fallback

## Additional Notes
- 'Sendgrid' is used as primary email provider whereas 'Mailgun' as fallback provider

## Pre-requisites
- Node 8.11.2
- npm 6.0.1
- export OR SET environments variables for below -
    - export SENDGRID_API_KEY='YOUR-SENDGRID_API_KEY';
    - export MAILGUN_API_KEY='YOUR-MAILGUN_API_KEY'; // The api_key must be base64 encoded else will throw unauthorized
- Have used sandbox domain of mailgun which lets 5 authorized recipients. You need to use either your custom domain
  or sandbox domain.

## In order to start this project,
- Clone this project from git.
- Refer README.md from client and server directories.

## Running the program in local mode
After building the application you can run the service by:

1) Starting Server application on -
 - http://localhost:3000

2) Starting Client application on -
 - http://localhost:8080

## Improvements TODO
- Basic client side and server validations done.
- No tests for user interface
- Fallback is not handled for unauthorized or forbidden error from providers