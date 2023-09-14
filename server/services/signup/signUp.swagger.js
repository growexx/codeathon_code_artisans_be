/**
 * @openapi
 * /auth/signup:
 *      post:
 *          tags: [Authentication]
 *          summary: User SignUp
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userSignUp'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successUserRegister'
 *              400:
 *                  description: Validation Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              422:
 *                  description: User Duplicate
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorUserRegister'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 *
 */

/**
 * @openapi
 * /auth/verify-account:
 *      post:
 *          tags: [Authentication]
 *          summary: User name verification
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userVerify'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successVerifyUser'
 *              400:
 *                  description: Validation Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 *
 */

/**
 * @openapi
 * /auth/resend-otp:
 *      post:
 *          tags: [Authentication]
 *          summary: To resend OTP
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/resendOTP'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successResendOTP'
 *              400:
 *                  description: Validation Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 *
 */
