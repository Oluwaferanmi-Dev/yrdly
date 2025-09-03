/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/newsletter/route";
exports.ids = ["app/api/newsletter/route"];
exports.modules = {

/***/ "(rsc)/./app/api/newsletter/route.ts":
/*!*************************************!*\
  !*** ./app/api/newsletter/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/dist/esm/index.js\");\n/* harmony import */ var _lib_brevo_email__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/brevo-email */ \"(rsc)/./lib/brevo-email.ts\");\n\n\n\n// Validation schema for newsletter signup\nconst newsletterSchema = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({\n    email: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().email('Please enter a valid email address'),\n    source: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().optional().default('newsletter-signup')\n});\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        // Validate the request body\n        const validatedData = newsletterSchema.parse(body);\n        const { email, source } = validatedData;\n        // Here you would typically:\n        // 1. Save to your database (Firebase Firestore, PostgreSQL, etc.)\n        // 2. Send to email service provider (Mailchimp, ConvertKit, etc.)\n        // 3. Send confirmation email\n        // Log the signup\n        console.log('Newsletter signup:', {\n            email,\n            source,\n            timestamp: new Date().toISOString()\n        });\n        // Send welcome email via Brevo\n        const emailResult = await (0,_lib_brevo_email__WEBPACK_IMPORTED_MODULE_2__.sendWelcomeEmail)({\n            email,\n            source,\n            name: undefined // You can add name field later if needed\n        });\n        if (!emailResult.success) {\n            console.error('Failed to send welcome email:', emailResult.error);\n        // Don't fail the signup if email fails, just log it\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: 'Successfully subscribed to newsletter! Check your email for a welcome message.'\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error('Newsletter signup error:', error);\n        if (error instanceof zod__WEBPACK_IMPORTED_MODULE_1__.z.ZodError) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: 'Invalid email address',\n                errors: error.errors\n            }, {\n                status: 400\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: 'Failed to subscribe. Please try again later.'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL25ld3NsZXR0ZXIvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF3RDtBQUNoQztBQUM2QjtBQUVyRCwwQ0FBMEM7QUFDMUMsTUFBTUcsbUJBQW1CRix5Q0FBUSxDQUFDO0lBQ2hDSSxPQUFPSix5Q0FBUSxHQUFHSSxLQUFLLENBQUM7SUFDeEJFLFFBQVFOLHlDQUFRLEdBQUdPLFFBQVEsR0FBR0MsT0FBTyxDQUFDO0FBQ3hDO0FBRU8sZUFBZUMsS0FBS0MsT0FBb0I7SUFDN0MsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUUsSUFBSTtRQUUvQiw0QkFBNEI7UUFDNUIsTUFBTUMsZ0JBQWdCWCxpQkFBaUJZLEtBQUssQ0FBQ0g7UUFDN0MsTUFBTSxFQUFFUCxLQUFLLEVBQUVFLE1BQU0sRUFBRSxHQUFHTztRQUUxQiw0QkFBNEI7UUFDNUIsa0VBQWtFO1FBQ2xFLGtFQUFrRTtRQUNsRSw2QkFBNkI7UUFFN0IsaUJBQWlCO1FBQ2pCRSxRQUFRQyxHQUFHLENBQUMsc0JBQXNCO1lBQUVaO1lBQU9FO1lBQVFXLFdBQVcsSUFBSUMsT0FBT0MsV0FBVztRQUFHO1FBRXZGLCtCQUErQjtRQUMvQixNQUFNQyxjQUFjLE1BQU1uQixrRUFBZ0JBLENBQUM7WUFDekNHO1lBQ0FFO1lBQ0FlLE1BQU1DLFVBQVUseUNBQXlDO1FBQzNEO1FBRUEsSUFBSSxDQUFDRixZQUFZRyxPQUFPLEVBQUU7WUFDeEJSLFFBQVFTLEtBQUssQ0FBQyxpQ0FBaUNKLFlBQVlJLEtBQUs7UUFDaEUsb0RBQW9EO1FBQ3REO1FBRUEsT0FBT3pCLHFEQUFZQSxDQUFDYSxJQUFJLENBQ3RCO1lBQ0VXLFNBQVM7WUFDVEUsU0FBUztRQUNYLEdBQ0E7WUFBRUMsUUFBUTtRQUFJO0lBR2xCLEVBQUUsT0FBT0YsT0FBTztRQUNkVCxRQUFRUyxLQUFLLENBQUMsNEJBQTRCQTtRQUUxQyxJQUFJQSxpQkFBaUJ4QiwyQ0FBVSxFQUFFO1lBQy9CLE9BQU9ELHFEQUFZQSxDQUFDYSxJQUFJLENBQ3RCO2dCQUNFVyxTQUFTO2dCQUNURSxTQUFTO2dCQUNURyxRQUFRSixNQUFNSSxNQUFNO1lBQ3RCLEdBQ0E7Z0JBQUVGLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE9BQU8zQixxREFBWUEsQ0FBQ2EsSUFBSSxDQUN0QjtZQUNFVyxTQUFTO1lBQ1RFLFNBQVM7UUFDWCxHQUNBO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFVTRVJcXERvY3VtZW50c1xcQ09ERVxceXJkbHlcXGFwcFxcYXBpXFxuZXdzbGV0dGVyXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcclxuaW1wb3J0IHsgc2VuZFdlbGNvbWVFbWFpbCB9IGZyb20gJ0AvbGliL2JyZXZvLWVtYWlsJztcclxuXHJcbi8vIFZhbGlkYXRpb24gc2NoZW1hIGZvciBuZXdzbGV0dGVyIHNpZ251cFxyXG5jb25zdCBuZXdzbGV0dGVyU2NoZW1hID0gei5vYmplY3Qoe1xyXG4gIGVtYWlsOiB6LnN0cmluZygpLmVtYWlsKCdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJyksXHJcbiAgc291cmNlOiB6LnN0cmluZygpLm9wdGlvbmFsKCkuZGVmYXVsdCgnbmV3c2xldHRlci1zaWdudXAnKSxcclxufSk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgICBcclxuICAgIC8vIFZhbGlkYXRlIHRoZSByZXF1ZXN0IGJvZHlcclxuICAgIGNvbnN0IHZhbGlkYXRlZERhdGEgPSBuZXdzbGV0dGVyU2NoZW1hLnBhcnNlKGJvZHkpO1xyXG4gICAgY29uc3QgeyBlbWFpbCwgc291cmNlIH0gPSB2YWxpZGF0ZWREYXRhO1xyXG5cclxuICAgIC8vIEhlcmUgeW91IHdvdWxkIHR5cGljYWxseTpcclxuICAgIC8vIDEuIFNhdmUgdG8geW91ciBkYXRhYmFzZSAoRmlyZWJhc2UgRmlyZXN0b3JlLCBQb3N0Z3JlU1FMLCBldGMuKVxyXG4gICAgLy8gMi4gU2VuZCB0byBlbWFpbCBzZXJ2aWNlIHByb3ZpZGVyIChNYWlsY2hpbXAsIENvbnZlcnRLaXQsIGV0Yy4pXHJcbiAgICAvLyAzLiBTZW5kIGNvbmZpcm1hdGlvbiBlbWFpbFxyXG4gICAgXHJcbiAgICAvLyBMb2cgdGhlIHNpZ251cFxyXG4gICAgY29uc29sZS5sb2coJ05ld3NsZXR0ZXIgc2lnbnVwOicsIHsgZW1haWwsIHNvdXJjZSwgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgfSk7XHJcbiAgICBcclxuICAgIC8vIFNlbmQgd2VsY29tZSBlbWFpbCB2aWEgQnJldm9cclxuICAgIGNvbnN0IGVtYWlsUmVzdWx0ID0gYXdhaXQgc2VuZFdlbGNvbWVFbWFpbCh7XHJcbiAgICAgIGVtYWlsLFxyXG4gICAgICBzb3VyY2UsXHJcbiAgICAgIG5hbWU6IHVuZGVmaW5lZCAvLyBZb3UgY2FuIGFkZCBuYW1lIGZpZWxkIGxhdGVyIGlmIG5lZWRlZFxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIGlmICghZW1haWxSZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2VuZCB3ZWxjb21lIGVtYWlsOicsIGVtYWlsUmVzdWx0LmVycm9yKTtcclxuICAgICAgLy8gRG9uJ3QgZmFpbCB0aGUgc2lnbnVwIGlmIGVtYWlsIGZhaWxzLCBqdXN0IGxvZyBpdFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBcclxuICAgICAgICBzdWNjZXNzOiB0cnVlLCBcclxuICAgICAgICBtZXNzYWdlOiAnU3VjY2Vzc2Z1bGx5IHN1YnNjcmliZWQgdG8gbmV3c2xldHRlciEgQ2hlY2sgeW91ciBlbWFpbCBmb3IgYSB3ZWxjb21lIG1lc3NhZ2UuJyBcclxuICAgICAgfSxcclxuICAgICAgeyBzdGF0dXM6IDIwMCB9XHJcbiAgICApO1xyXG5cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignTmV3c2xldHRlciBzaWdudXAgZXJyb3I6JywgZXJyb3IpO1xyXG4gICAgXHJcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiB6LlpvZEVycm9yKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IFxyXG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsIFxyXG4gICAgICAgICAgbWVzc2FnZTogJ0ludmFsaWQgZW1haWwgYWRkcmVzcycsXHJcbiAgICAgICAgICBlcnJvcnM6IGVycm9yLmVycm9ycyBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSwgXHJcbiAgICAgICAgbWVzc2FnZTogJ0ZhaWxlZCB0byBzdWJzY3JpYmUuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJyBcclxuICAgICAgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwieiIsInNlbmRXZWxjb21lRW1haWwiLCJuZXdzbGV0dGVyU2NoZW1hIiwib2JqZWN0IiwiZW1haWwiLCJzdHJpbmciLCJzb3VyY2UiLCJvcHRpb25hbCIsImRlZmF1bHQiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJqc29uIiwidmFsaWRhdGVkRGF0YSIsInBhcnNlIiwiY29uc29sZSIsImxvZyIsInRpbWVzdGFtcCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImVtYWlsUmVzdWx0IiwibmFtZSIsInVuZGVmaW5lZCIsInN1Y2Nlc3MiLCJlcnJvciIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJab2RFcnJvciIsImVycm9ycyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/newsletter/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/brevo-email.ts":
/*!****************************!*\
  !*** ./lib/brevo-email.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sendWelcomeEmail: () => (/* binding */ sendWelcomeEmail),\n/* harmony export */   sendWelcomeSMS: () => (/* binding */ sendWelcomeSMS)\n/* harmony export */ });\n/* harmony import */ var _getbrevo_brevo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @getbrevo/brevo */ \"(rsc)/./node_modules/@getbrevo/brevo/dist/api.js\");\n/* harmony import */ var _getbrevo_brevo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_getbrevo_brevo__WEBPACK_IMPORTED_MODULE_0__);\n\n// Initialize Brevo API\nconst apiInstance = new _getbrevo_brevo__WEBPACK_IMPORTED_MODULE_0__.TransactionalEmailsApi();\napiInstance.setApiKey(_getbrevo_brevo__WEBPACK_IMPORTED_MODULE_0__.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);\nasync function sendWelcomeEmail({ email, name, source }) {\n    try {\n        const sendSmtpEmail = new _getbrevo_brevo__WEBPACK_IMPORTED_MODULE_0__.SendSmtpEmail();\n        // Email configuration\n        sendSmtpEmail.subject = \"Welcome to Yrdly Newsletter! 🎉\";\n        sendSmtpEmail.sender = {\n            name: \"Yrdly Team\",\n            email: \"noreply@yrdly.com\"\n        };\n        sendSmtpEmail.to = [\n            {\n                email,\n                name: name || \"Yrdly User\"\n            }\n        ];\n        // HTML content\n        sendSmtpEmail.htmlContent = `\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <meta charset=\"utf-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n          <title>Welcome to Yrdly</title>\n        </head>\n        <body style=\"margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;\">\n          <div style=\"max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;\">\n            <!-- Header -->\n            <div style=\"text-align: center; padding: 20px 0; border-bottom: 2px solid #16a34a;\">\n              <h1 style=\"color: #16a34a; margin: 0; font-size: 28px;\">Welcome to Yrdly!</h1>\n              <p style=\"color: #666; margin: 10px 0 0 0;\">Your Neighborhood Network</p>\n            </div>\n            \n            <!-- Main Content -->\n            <div style=\"padding: 30px 20px;\">\n              <h2 style=\"color: #333; margin-bottom: 20px;\">Thanks for joining our community! 🎉</h2>\n              \n              <p style=\"color: #555; line-height: 1.6; margin-bottom: 20px;\">\n                Hi${name ? ` ${name}` : ''}! We're excited to have you as part of the Yrdly community. \n                You'll now receive updates about what's happening in your neighborhood.\n              </p>\n              \n              <div style=\"background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; margin: 20px 0;\">\n                <h3 style=\"color: #16a34a; margin-top: 0;\">What you'll receive:</h3>\n                <ul style=\"color: #555; line-height: 1.8;\">\n                  <li>🏠 <strong>New local listings</strong> - Items for sale in your area</li>\n                  <li>🎉 <strong>Community events</strong> - Meetups and local happenings</li>\n                  <li>💰 <strong>Special deals</strong> - Exclusive offers from local businesses</li>\n                  <li>📱 <strong>Platform updates</strong> - New features and improvements</li>\n                </ul>\n              </div>\n              \n              <div style=\"text-align: center; margin: 30px 0;\">\n                <a href=\"https://yrdly-app.vercel.app/\" \n                   style=\"background-color: #16a34a; color: white; padding: 12px 30px; \n                          text-decoration: none; border-radius: 6px; font-weight: bold; \n                          display: inline-block;\">\n                  Explore Yrdly Now\n                </a>\n              </div>\n              \n              <p style=\"color: #666; font-size: 14px; line-height: 1.5;\">\n                <strong>Signup Source:</strong> ${source || 'Newsletter'}<br>\n                <strong>Date:</strong> ${new Date().toLocaleDateString()}\n              </p>\n            </div>\n            \n            <!-- Footer -->\n            <div style=\"border-top: 1px solid #eee; padding: 20px; text-align: center; color: #666; font-size: 12px;\">\n              <p>© 2025 Yrdly. All rights reserved.</p>\n              <p>\n                <a href=\"https://yrdly.com/unsubscribe\" style=\"color: #16a34a;\">Unsubscribe</a> | \n                <a href=\"https://yrdly.com/privacy\" style=\"color: #16a34a;\">Privacy Policy</a>\n              </p>\n            </div>\n          </div>\n        </body>\n      </html>\n    `;\n        // Send email\n        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);\n        console.log('Brevo email sent successfully:', {\n            email,\n            source,\n            messageId: data.messageId,\n            timestamp: new Date().toISOString()\n        });\n        return {\n            success: true,\n            messageId: data.messageId,\n            data\n        };\n    } catch (error) {\n        console.error('Brevo email error:', error);\n        return {\n            success: false,\n            error: error instanceof Error ? error.message : 'Unknown error'\n        };\n    }\n}\n// Optional: Send SMS notification (if you have SMS credits)\nasync function sendWelcomeSMS(phoneNumber, name) {\n    try {\n        const apiInstance = new _getbrevo_brevo__WEBPACK_IMPORTED_MODULE_0__.TransactionalSMSApi();\n        apiInstance.setApiKey(_getbrevo_brevo__WEBPACK_IMPORTED_MODULE_0__.TransactionalSMSApiApiKeys.apiKey, process.env.BREVO_API_KEY);\n        const sendTransacSms = new _getbrevo_brevo__WEBPACK_IMPORTED_MODULE_0__.SendTransacSms();\n        sendTransacSms.sender = \"Yrdly\";\n        sendTransacSms.recipient = phoneNumber;\n        sendTransacSms.content = `Welcome to Yrdly${name ? ` ${name}` : ''}! 🎉 Your neighborhood network is now connected. Check your email for more details.`;\n        const data = await apiInstance.sendTransacSms(sendTransacSms);\n        console.log('Brevo SMS sent successfully:', {\n            phoneNumber,\n            messageId: data.messageId,\n            timestamp: new Date().toISOString()\n        });\n        return {\n            success: true,\n            messageId: data.messageId\n        };\n    } catch (error) {\n        console.error('Brevo SMS error:', error);\n        return {\n            success: false,\n            error\n        };\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYnJldm8tZW1haWwudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF5QztBQUV6Qyx1QkFBdUI7QUFDdkIsTUFBTUMsY0FBYyxJQUFJRCxtRUFBNEI7QUFDcERDLFlBQVlFLFNBQVMsQ0FDbkJILDBFQUFtQyxDQUFDSyxNQUFNLEVBQzFDQyxRQUFRQyxHQUFHLENBQUNDLGFBQWE7QUFTcEIsZUFBZUMsaUJBQWlCLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFQyxNQUFNLEVBQWE7SUFDdkUsSUFBSTtRQUNGLE1BQU1DLGdCQUFnQixJQUFJYiwwREFBbUI7UUFFN0Msc0JBQXNCO1FBQ3RCYSxjQUFjRSxPQUFPLEdBQUc7UUFDeEJGLGNBQWNHLE1BQU0sR0FBRztZQUNyQkwsTUFBTTtZQUNORCxPQUFPO1FBQ1Q7UUFDQUcsY0FBY0ksRUFBRSxHQUFHO1lBQUM7Z0JBQUVQO2dCQUFPQyxNQUFNQSxRQUFRO1lBQWE7U0FBRTtRQUUxRCxlQUFlO1FBQ2ZFLGNBQWNLLFdBQVcsR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBcUJmLEVBQUVQLE9BQU8sQ0FBQyxDQUFDLEVBQUVBLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBd0JLLEVBQUVDLFVBQVUsYUFBYTt1Q0FDbEMsRUFBRSxJQUFJTyxPQUFPQyxrQkFBa0IsR0FBRzs7Ozs7Ozs7Ozs7Ozs7O0lBZXJFLENBQUM7UUFFRCxhQUFhO1FBQ2IsTUFBTUMsT0FBTyxNQUFNcEIsWUFBWXFCLGdCQUFnQixDQUFDVDtRQUVoRFUsUUFBUUMsR0FBRyxDQUFDLGtDQUFrQztZQUM1Q2Q7WUFDQUU7WUFDQWEsV0FBV0osS0FBS0ksU0FBUztZQUN6QkMsV0FBVyxJQUFJUCxPQUFPUSxXQUFXO1FBQ25DO1FBRUEsT0FBTztZQUNMQyxTQUFTO1lBQ1RILFdBQVdKLEtBQUtJLFNBQVM7WUFDekJKO1FBQ0Y7SUFFRixFQUFFLE9BQU9RLE9BQU87UUFDZE4sUUFBUU0sS0FBSyxDQUFDLHNCQUFzQkE7UUFDcEMsT0FBTztZQUNMRCxTQUFTO1lBQ1RDLE9BQU9BLGlCQUFpQkMsUUFBUUQsTUFBTUUsT0FBTyxHQUFHO1FBQ2xEO0lBQ0Y7QUFDRjtBQUVBLDREQUE0RDtBQUNyRCxlQUFlQyxlQUFlQyxXQUFtQixFQUFFdEIsSUFBYTtJQUNyRSxJQUFJO1FBQ0YsTUFBTVYsY0FBYyxJQUFJRCxnRUFBeUI7UUFDakRDLFlBQVlFLFNBQVMsQ0FDbkJILHVFQUFnQyxDQUFDSyxNQUFNLEVBQ3ZDQyxRQUFRQyxHQUFHLENBQUNDLGFBQWE7UUFHM0IsTUFBTTRCLGlCQUFpQixJQUFJcEMsMkRBQW9CO1FBQy9Db0MsZUFBZXBCLE1BQU0sR0FBRztRQUN4Qm9CLGVBQWVFLFNBQVMsR0FBR0w7UUFDM0JHLGVBQWVHLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixFQUFFNUIsT0FBTyxDQUFDLENBQUMsRUFBRUEsTUFBTSxHQUFHLEdBQUcsbUZBQW1GLENBQUM7UUFFdkosTUFBTVUsT0FBTyxNQUFNcEIsWUFBWW1DLGNBQWMsQ0FBQ0E7UUFFOUNiLFFBQVFDLEdBQUcsQ0FBQyxnQ0FBZ0M7WUFDMUNTO1lBQ0FSLFdBQVdKLEtBQUtJLFNBQVM7WUFDekJDLFdBQVcsSUFBSVAsT0FBT1EsV0FBVztRQUNuQztRQUVBLE9BQU87WUFBRUMsU0FBUztZQUFNSCxXQUFXSixLQUFLSSxTQUFTO1FBQUM7SUFFcEQsRUFBRSxPQUFPSSxPQUFPO1FBQ2ROLFFBQVFNLEtBQUssQ0FBQyxvQkFBb0JBO1FBQ2xDLE9BQU87WUFBRUQsU0FBUztZQUFPQztRQUFNO0lBQ2pDO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcVVNFUlxcRG9jdW1lbnRzXFxDT0RFXFx5cmRseVxcbGliXFxicmV2by1lbWFpbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBicmV2byBmcm9tICdAZ2V0YnJldm8vYnJldm8nO1xyXG5cclxuLy8gSW5pdGlhbGl6ZSBCcmV2byBBUElcclxuY29uc3QgYXBpSW5zdGFuY2UgPSBuZXcgYnJldm8uVHJhbnNhY3Rpb25hbEVtYWlsc0FwaSgpO1xyXG5hcGlJbnN0YW5jZS5zZXRBcGlLZXkoXHJcbiAgYnJldm8uVHJhbnNhY3Rpb25hbEVtYWlsc0FwaUFwaUtleXMuYXBpS2V5LCBcclxuICBwcm9jZXNzLmVudi5CUkVWT19BUElfS0VZIVxyXG4pO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFbWFpbERhdGEge1xyXG4gIGVtYWlsOiBzdHJpbmc7XHJcbiAgbmFtZT86IHN0cmluZztcclxuICBzb3VyY2U/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kV2VsY29tZUVtYWlsKHsgZW1haWwsIG5hbWUsIHNvdXJjZSB9OiBFbWFpbERhdGEpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc2VuZFNtdHBFbWFpbCA9IG5ldyBicmV2by5TZW5kU210cEVtYWlsKCk7XHJcbiAgICBcclxuICAgIC8vIEVtYWlsIGNvbmZpZ3VyYXRpb25cclxuICAgIHNlbmRTbXRwRW1haWwuc3ViamVjdCA9IFwiV2VsY29tZSB0byBZcmRseSBOZXdzbGV0dGVyISDwn46JXCI7XHJcbiAgICBzZW5kU210cEVtYWlsLnNlbmRlciA9IHsgXHJcbiAgICAgIG5hbWU6IFwiWXJkbHkgVGVhbVwiLCBcclxuICAgICAgZW1haWw6IFwibm9yZXBseUB5cmRseS5jb21cIiBcclxuICAgIH07XHJcbiAgICBzZW5kU210cEVtYWlsLnRvID0gW3sgZW1haWwsIG5hbWU6IG5hbWUgfHwgXCJZcmRseSBVc2VyXCIgfV07XHJcbiAgICBcclxuICAgIC8vIEhUTUwgY29udGVudFxyXG4gICAgc2VuZFNtdHBFbWFpbC5odG1sQ29udGVudCA9IGBcclxuICAgICAgPCFET0NUWVBFIGh0bWw+XHJcbiAgICAgIDxodG1sPlxyXG4gICAgICAgIDxoZWFkPlxyXG4gICAgICAgICAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+XHJcbiAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiPlxyXG4gICAgICAgICAgPHRpdGxlPldlbGNvbWUgdG8gWXJkbHk8L3RpdGxlPlxyXG4gICAgICAgIDwvaGVhZD5cclxuICAgICAgICA8Ym9keSBzdHlsZT1cIm1hcmdpbjogMDsgcGFkZGluZzogMDsgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1wiPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cIm1heC13aWR0aDogNjAwcHg7IG1hcmdpbjogMCBhdXRvOyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgcGFkZGluZzogMjBweDtcIj5cclxuICAgICAgICAgICAgPCEtLSBIZWFkZXIgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IHBhZGRpbmc6IDIwcHggMDsgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICMxNmEzNGE7XCI+XHJcbiAgICAgICAgICAgICAgPGgxIHN0eWxlPVwiY29sb3I6ICMxNmEzNGE7IG1hcmdpbjogMDsgZm9udC1zaXplOiAyOHB4O1wiPldlbGNvbWUgdG8gWXJkbHkhPC9oMT5cclxuICAgICAgICAgICAgICA8cCBzdHlsZT1cImNvbG9yOiAjNjY2OyBtYXJnaW46IDEwcHggMCAwIDA7XCI+WW91ciBOZWlnaGJvcmhvb2QgTmV0d29yazwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8IS0tIE1haW4gQ29udGVudCAtLT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDMwcHggMjBweDtcIj5cclxuICAgICAgICAgICAgICA8aDIgc3R5bGU9XCJjb2xvcjogIzMzMzsgbWFyZ2luLWJvdHRvbTogMjBweDtcIj5UaGFua3MgZm9yIGpvaW5pbmcgb3VyIGNvbW11bml0eSEg8J+OiTwvaDI+XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgPHAgc3R5bGU9XCJjb2xvcjogIzU1NTsgbGluZS1oZWlnaHQ6IDEuNjsgbWFyZ2luLWJvdHRvbTogMjBweDtcIj5cclxuICAgICAgICAgICAgICAgIEhpJHtuYW1lID8gYCAke25hbWV9YCA6ICcnfSEgV2UncmUgZXhjaXRlZCB0byBoYXZlIHlvdSBhcyBwYXJ0IG9mIHRoZSBZcmRseSBjb21tdW5pdHkuIFxyXG4gICAgICAgICAgICAgICAgWW91J2xsIG5vdyByZWNlaXZlIHVwZGF0ZXMgYWJvdXQgd2hhdCdzIGhhcHBlbmluZyBpbiB5b3VyIG5laWdoYm9yaG9vZC5cclxuICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNmMGZkZjQ7IGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzE2YTM0YTsgcGFkZGluZzogMjBweDsgbWFyZ2luOiAyMHB4IDA7XCI+XHJcbiAgICAgICAgICAgICAgICA8aDMgc3R5bGU9XCJjb2xvcjogIzE2YTM0YTsgbWFyZ2luLXRvcDogMDtcIj5XaGF0IHlvdSdsbCByZWNlaXZlOjwvaDM+XHJcbiAgICAgICAgICAgICAgICA8dWwgc3R5bGU9XCJjb2xvcjogIzU1NTsgbGluZS1oZWlnaHQ6IDEuODtcIj5cclxuICAgICAgICAgICAgICAgICAgPGxpPvCfj6AgPHN0cm9uZz5OZXcgbG9jYWwgbGlzdGluZ3M8L3N0cm9uZz4gLSBJdGVtcyBmb3Igc2FsZSBpbiB5b3VyIGFyZWE8L2xpPlxyXG4gICAgICAgICAgICAgICAgICA8bGk+8J+OiSA8c3Ryb25nPkNvbW11bml0eSBldmVudHM8L3N0cm9uZz4gLSBNZWV0dXBzIGFuZCBsb2NhbCBoYXBwZW5pbmdzPC9saT5cclxuICAgICAgICAgICAgICAgICAgPGxpPvCfkrAgPHN0cm9uZz5TcGVjaWFsIGRlYWxzPC9zdHJvbmc+IC0gRXhjbHVzaXZlIG9mZmVycyBmcm9tIGxvY2FsIGJ1c2luZXNzZXM8L2xpPlxyXG4gICAgICAgICAgICAgICAgICA8bGk+8J+TsSA8c3Ryb25nPlBsYXRmb3JtIHVwZGF0ZXM8L3N0cm9uZz4gLSBOZXcgZmVhdHVyZXMgYW5kIGltcHJvdmVtZW50czwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IG1hcmdpbjogMzBweCAwO1wiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8veXJkbHktYXBwLnZlcmNlbC5hcHAvXCIgXHJcbiAgICAgICAgICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICMxNmEzNGE7IGNvbG9yOiB3aGl0ZTsgcGFkZGluZzogMTJweCAzMHB4OyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGJvcmRlci1yYWRpdXM6IDZweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcIj5cclxuICAgICAgICAgICAgICAgICAgRXhwbG9yZSBZcmRseSBOb3dcclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICA8cCBzdHlsZT1cImNvbG9yOiAjNjY2OyBmb250LXNpemU6IDE0cHg7IGxpbmUtaGVpZ2h0OiAxLjU7XCI+XHJcbiAgICAgICAgICAgICAgICA8c3Ryb25nPlNpZ251cCBTb3VyY2U6PC9zdHJvbmc+ICR7c291cmNlIHx8ICdOZXdzbGV0dGVyJ308YnI+XHJcbiAgICAgICAgICAgICAgICA8c3Ryb25nPkRhdGU6PC9zdHJvbmc+ICR7bmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoKX1cclxuICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgPCEtLSBGb290ZXIgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJib3JkZXItdG9wOiAxcHggc29saWQgI2VlZTsgcGFkZGluZzogMjBweDsgdGV4dC1hbGlnbjogY2VudGVyOyBjb2xvcjogIzY2NjsgZm9udC1zaXplOiAxMnB4O1wiPlxyXG4gICAgICAgICAgICAgIDxwPsKpIDIwMjUgWXJkbHkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuPC9wPlxyXG4gICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8veXJkbHkuY29tL3Vuc3Vic2NyaWJlXCIgc3R5bGU9XCJjb2xvcjogIzE2YTM0YTtcIj5VbnN1YnNjcmliZTwvYT4gfCBcclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3lyZGx5LmNvbS9wcml2YWN5XCIgc3R5bGU9XCJjb2xvcjogIzE2YTM0YTtcIj5Qcml2YWN5IFBvbGljeTwvYT5cclxuICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9ib2R5PlxyXG4gICAgICA8L2h0bWw+XHJcbiAgICBgO1xyXG4gICAgXHJcbiAgICAvLyBTZW5kIGVtYWlsXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgYXBpSW5zdGFuY2Uuc2VuZFRyYW5zYWNFbWFpbChzZW5kU210cEVtYWlsKTtcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coJ0JyZXZvIGVtYWlsIHNlbnQgc3VjY2Vzc2Z1bGx5OicsIHtcclxuICAgICAgZW1haWwsXHJcbiAgICAgIHNvdXJjZSxcclxuICAgICAgbWVzc2FnZUlkOiBkYXRhLm1lc3NhZ2VJZCxcclxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4geyBcclxuICAgICAgc3VjY2VzczogdHJ1ZSwgXHJcbiAgICAgIG1lc3NhZ2VJZDogZGF0YS5tZXNzYWdlSWQsXHJcbiAgICAgIGRhdGEgXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0JyZXZvIGVtYWlsIGVycm9yOicsIGVycm9yKTtcclxuICAgIHJldHVybiB7IFxyXG4gICAgICBzdWNjZXNzOiBmYWxzZSwgXHJcbiAgICAgIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdVbmtub3duIGVycm9yJ1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbi8vIE9wdGlvbmFsOiBTZW5kIFNNUyBub3RpZmljYXRpb24gKGlmIHlvdSBoYXZlIFNNUyBjcmVkaXRzKVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFdlbGNvbWVTTVMocGhvbmVOdW1iZXI6IHN0cmluZywgbmFtZT86IHN0cmluZykge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBhcGlJbnN0YW5jZSA9IG5ldyBicmV2by5UcmFuc2FjdGlvbmFsU01TQXBpKCk7XHJcbiAgICBhcGlJbnN0YW5jZS5zZXRBcGlLZXkoXHJcbiAgICAgIGJyZXZvLlRyYW5zYWN0aW9uYWxTTVNBcGlBcGlLZXlzLmFwaUtleSwgXHJcbiAgICAgIHByb2Nlc3MuZW52LkJSRVZPX0FQSV9LRVkhXHJcbiAgICApO1xyXG4gICAgXHJcbiAgICBjb25zdCBzZW5kVHJhbnNhY1NtcyA9IG5ldyBicmV2by5TZW5kVHJhbnNhY1NtcygpO1xyXG4gICAgc2VuZFRyYW5zYWNTbXMuc2VuZGVyID0gXCJZcmRseVwiO1xyXG4gICAgc2VuZFRyYW5zYWNTbXMucmVjaXBpZW50ID0gcGhvbmVOdW1iZXI7XHJcbiAgICBzZW5kVHJhbnNhY1Ntcy5jb250ZW50ID0gYFdlbGNvbWUgdG8gWXJkbHkke25hbWUgPyBgICR7bmFtZX1gIDogJyd9ISDwn46JIFlvdXIgbmVpZ2hib3Job29kIG5ldHdvcmsgaXMgbm93IGNvbm5lY3RlZC4gQ2hlY2sgeW91ciBlbWFpbCBmb3IgbW9yZSBkZXRhaWxzLmA7XHJcbiAgICBcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBhcGlJbnN0YW5jZS5zZW5kVHJhbnNhY1NtcyhzZW5kVHJhbnNhY1Ntcyk7XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCdCcmV2byBTTVMgc2VudCBzdWNjZXNzZnVsbHk6Jywge1xyXG4gICAgICBwaG9uZU51bWJlcixcclxuICAgICAgbWVzc2FnZUlkOiBkYXRhLm1lc3NhZ2VJZCxcclxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlSWQ6IGRhdGEubWVzc2FnZUlkIH07XHJcbiAgICBcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignQnJldm8gU01TIGVycm9yOicsIGVycm9yKTtcclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvciB9O1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiYnJldm8iLCJhcGlJbnN0YW5jZSIsIlRyYW5zYWN0aW9uYWxFbWFpbHNBcGkiLCJzZXRBcGlLZXkiLCJUcmFuc2FjdGlvbmFsRW1haWxzQXBpQXBpS2V5cyIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJCUkVWT19BUElfS0VZIiwic2VuZFdlbGNvbWVFbWFpbCIsImVtYWlsIiwibmFtZSIsInNvdXJjZSIsInNlbmRTbXRwRW1haWwiLCJTZW5kU210cEVtYWlsIiwic3ViamVjdCIsInNlbmRlciIsInRvIiwiaHRtbENvbnRlbnQiLCJEYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwiZGF0YSIsInNlbmRUcmFuc2FjRW1haWwiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZUlkIiwidGltZXN0YW1wIiwidG9JU09TdHJpbmciLCJzdWNjZXNzIiwiZXJyb3IiLCJFcnJvciIsIm1lc3NhZ2UiLCJzZW5kV2VsY29tZVNNUyIsInBob25lTnVtYmVyIiwiVHJhbnNhY3Rpb25hbFNNU0FwaSIsIlRyYW5zYWN0aW9uYWxTTVNBcGlBcGlLZXlzIiwic2VuZFRyYW5zYWNTbXMiLCJTZW5kVHJhbnNhY1NtcyIsInJlY2lwaWVudCIsImNvbnRlbnQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/brevo-email.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnewsletter%2Froute&page=%2Fapi%2Fnewsletter%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnewsletter%2Froute.ts&appDir=C%3A%5CUsers%5CUSER%5CDocuments%5CCODE%5Cyrdly%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUSER%5CDocuments%5CCODE%5Cyrdly&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnewsletter%2Froute&page=%2Fapi%2Fnewsletter%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnewsletter%2Froute.ts&appDir=C%3A%5CUsers%5CUSER%5CDocuments%5CCODE%5Cyrdly%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUSER%5CDocuments%5CCODE%5Cyrdly&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_USER_Documents_CODE_yrdly_app_api_newsletter_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/newsletter/route.ts */ \"(rsc)/./app/api/newsletter/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/newsletter/route\",\n        pathname: \"/api/newsletter\",\n        filename: \"route\",\n        bundlePath: \"app/api/newsletter/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\USER\\\\Documents\\\\CODE\\\\yrdly\\\\app\\\\api\\\\newsletter\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_USER_Documents_CODE_yrdly_app_api_newsletter_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZuZXdzbGV0dGVyJTJGcm91dGUmcGFnZT0lMkZhcGklMkZuZXdzbGV0dGVyJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGbmV3c2xldHRlciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNVU0VSJTVDRG9jdW1lbnRzJTVDQ09ERSU1Q3lyZGx5JTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNVU0VSJTVDRG9jdW1lbnRzJTVDQ09ERSU1Q3lyZGx5JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN1QjtBQUNwRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcVVNFUlxcXFxEb2N1bWVudHNcXFxcQ09ERVxcXFx5cmRseVxcXFxhcHBcXFxcYXBpXFxcXG5ld3NsZXR0ZXJcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL25ld3NsZXR0ZXIvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9uZXdzbGV0dGVyXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9uZXdzbGV0dGVyL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcVVNFUlxcXFxEb2N1bWVudHNcXFxcQ09ERVxcXFx5cmRseVxcXFxhcHBcXFxcYXBpXFxcXG5ld3NsZXR0ZXJcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnewsletter%2Froute&page=%2Fapi%2Fnewsletter%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnewsletter%2Froute.ts&appDir=C%3A%5CUsers%5CUSER%5CDocuments%5CCODE%5Cyrdly%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUSER%5CDocuments%5CCODE%5Cyrdly&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/zod","vendor-chunks/@getbrevo","vendor-chunks/asynckit","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/call-bind-apply-helpers","vendor-chunks/debug","vendor-chunks/get-proto","vendor-chunks/mime-db","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/form-data","vendor-chunks/follow-redirects","vendor-chunks/axios","vendor-chunks/supports-color","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/mime-types","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/has-flag","vendor-chunks/get-intrinsic","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/delayed-stream","vendor-chunks/combined-stream"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnewsletter%2Froute&page=%2Fapi%2Fnewsletter%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnewsletter%2Froute.ts&appDir=C%3A%5CUsers%5CUSER%5CDocuments%5CCODE%5Cyrdly%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUSER%5CDocuments%5CCODE%5Cyrdly&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();