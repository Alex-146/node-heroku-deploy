# Node Heroku Deploy

[Try it!](https://node-deploy-alex.herokuapp.com)

## Prerequisites

> __user-config.json__ or __environment variable__

| Variable | Description |
| - | - |
| DROPBOX_TOKEN | used to upload files into cloud storage |
| SCRIPT_URL | redirects to this link in _/upload_ route |
| TELEGRAM_TOKEN | used with _CHAT_ID_ to send message after file upload |
| CHAT_ID | notify user with uploaded file link |

## Licenses

This application is licensed under the MIT license. See the [LICENSE](https://github.com/Alex-146/node-heroku-deploy/blob/master/LICENSE) for more information.

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [dropbox](https://www.npmjs.com/package/dropbox)
- [axios](https://www.npmjs.com/package/axios)
- [nodemon](https://www.npmjs.com/package/nodemon)
