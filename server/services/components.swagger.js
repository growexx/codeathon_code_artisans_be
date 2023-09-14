/**
 * @openapi
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              name: Authorization
 *              type: apiKey
 *              in: header
 *              bearerFormat: JWT
 *      security:
 *          - bearerAuth: []
 *      errorProperties:
 *          type: object
 *          properties:
 *              status:
 *                  type: number
 *                  description: status code
 *              message:
 *                  type: string
 *                  description: user message
 *
 *      userProperties:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: user email
 *              password:
 *                  type: string
 *                  description: user password
 *              status:
 *                  type: boolean
 *                  description: User Status
 *              data:
 *                  type: object
 *                  description: User Information
 *              token:
 *                  type: string
 *                  description: User Token
 *              otp:
 *                  type: string
 *                  description: one time password
 *              asswor:
 *                  type: string
 *                  description: encrypted password
 *
 *      schemas:
 *          errorBadRequest:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 0
 *                  message: Request is invalid
 *
 *          errorUserRegister:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 0
 *                  message: This user is already registered with us.
 *
 *          unexpectedError:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 0
 *                  message: Something went wrong. please try again.
 *
 *          userSignUp:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      $ref: '#/components/userProperties/properties/email'
 *                  password:
 *                      $ref: '#/components/userProperties/properties/password'
 *              example:
 *                  email: developer@mailinator.com
 *                  password: 8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e
 *
 *          AgencySignUp:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *                  - token
 *              properties:
 *                  email:
 *                      $ref: '#/components/userProperties/properties/email'
 *                  password:
 *                      $ref: '#/components/userProperties/properties/password'
 *                  token:
 *                      $ref: '#/components/userProperties/properties/token'
 *              example:
 *                  email: developer@mailinator.com
 *                  password: 8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e
 *                  token: 5f523e4a7e416a76f64ea920
 *
 *          successUserRegister:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 1
 *                  message: Success.
 *
 *          successAgencyrRegister:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 1
 *                  message: Success.
 *
 *          successAgencyrUserEmail:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *                  - type: object
 *                    properties:
 *                      data:
 *                          $ref: '#/components/userProperties/properties/email'
 *                    example:
 *                      status: 1
 *                      message: Success.
 *                      data: test@example.com
 *
 *          userVerify:
 *              type: object
 *              required:
 *                  - email
 *                  - otp
 *              properties:
 *                  email:
 *                      $ref: '#/components/userProperties/properties/email'
 *                  otp:
 *                      $ref: '#/components/userProperties/properties/otp'
 *              example:
 *                  email: developer@mailinator.com
 *                  otp: 123456
 *
 *          successVerifyUser:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 1
 *                  message: Email is verified successfully.
 *
 *          resendOTP:
 *              type: object
 *              required:
 *                  - email
 *              properties:
 *                  email:
 *                      $ref: '#/components/userProperties/properties/email'
 *              example:
 *                  email: developer@mailinator.com
 *
 *          successResendOTP:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 1
 *                  message: Email resend successful.
 *
 *          userSignIn:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      $ref: '#/components/userProperties/properties/email'
 *                  password:
 *                      $ref: '#/components/userProperties/properties/password'
 *              example:
 *                  email: researcher@mailinator.com
 *                  password: researcher
 *
 *          successLogin:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *                  - type: object
 *                    properties:
 *                      data:
 *                          $ref: '#/components/userProperties/properties/data'
 *              example:
 *                  status: 1
 *                  message: User successfully logged in
 *                  data:
 *                      firstName: Sam
 *                      lastName: Jones
 *                      username: researcher@mailinator.com
 *                      role: 1
 *                      token: TOKEN
 *
 *          unauthorisedAccessLogin:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 0
 *                  message: Invalid user credentials.
 *
 *          unauthorisedAccess:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 0
 *                  message: You are not authorized to access this resource.
 *
 *          userForgotPassword:
 *              type: object
 *              required:
 *                  - email
 *              properties:
 *                  email:
 *                      $ref: '#/components/userProperties/properties/email'
 *              example:
 *                  email: test231@example.com
 *
 *          userVerifyToken:
 *              type: object
 *              required:
 *                  - token
 *              properties:
 *                  token:
 *                      $ref: '#/components/userProperties/properties/token'
 *              example:
 *                  token: 4hoR8EAXYEbT
 *
 *          userResetPassword:
 *              type: object
 *              required:
 *                  - token
 *                  - asswor
 *              properties:
 *                  token:
 *                      $ref: '#/components/userProperties/properties/token'
 *                  asswor:
 *                      $ref: '#/components/userProperties/properties/asswor'
 *              example:
 *                  token: 4hoR8EAXYEbT
 *                  asswor: SHA256 encripted password
 *
 *          passwordInvalid:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 0
 *                  message: please enter password.
 *
 *          errorForgotPassword:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 0
 *                  message: please enter email address.
 *
 *          successForgotPassword:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 1
 *                  message: An email has been sent. Please follow instructions on it.
 *
 *          successVerifyToken:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 1
 *                  message: Link validated successfully.
 *
 *          errorVerifyToken:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 0
 *                  message: Link has expired, kindly reset password again.
 *
 *          successResetPassword:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 0
 *                  message: Password Updated Successfully.
 *
 *          successUserDetails:
 *              type: object
 *              properties:
 *                  status:
 *                      $ref: '#/components/userProperties/properties/status'
 *                  message:
 *                      $ref: '#/components/errorProperties/properties/message'
 *                  data:
 *                      $ref: '#/components/userProperties/properties/data'
 *              example:
 *                  status: true
 *                  message: User successfully logged in
 *                  data:
 *                      firstName: Sam
 *                      lastName: Jones
 *                      username: researcher@mailinator.com
 *                      role: research
 *                      token: TOKEN
 *
 *          successUploadProfilePicture:
 *              allOf:
 *                  - $ref: '#/components/schemas/successLogin'
 *              example:
 *                  status: 1
 *                  message: Success.
 *                  data:
 *                      profilePicture: s3url
 *
 *          successDeleteProfilePicture:
 *              allOf:
 *                  - $ref: '#/components/errorProperties'
 *              example:
 *                  status: 1
 *                  message: Success.
 *
 *          changePassword:
 *              type: object
 *              required:
 *                  - oldPassword
 *                  - newPassword
 *              properties:
 *                  oldPassword:
 *                      $ref: '#/components/userProperties/properties/password'
 *                  newPassword:
 *                      $ref: '#/components/userProperties/properties/password'
 *              example:
 *                  oldPassword: 'OLD PASSWORD SHA256'
 *                  newPassword: 'NEW PASSWORD SHA256'
 *
 *          successChangePassword:
 *              type: object
 *              properties:
 *                  status:
 *                      $ref: '#/components/userProperties/properties/status'
 *                  message:
 *                      $ref: '#/components/errorProperties/properties/message'
 *              example:
 *                  status: true
 *                  message: CHANGE_PASSWORD_SUCCESS
 */

