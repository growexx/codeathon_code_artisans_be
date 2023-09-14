/**
 * @openapi
 * /user/details:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [User]
 *          summary: 'User Details'
 *          responses:
 *              200:
 *                  description: get user datails
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successUserDetails'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              401:
 *                  description: Unauthorized Access
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unauthorisedAccess'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 */

/**
 * @openapi
 * /user/picture:
 *      put:
 *          security:
 *              - bearerAuth: []
 *          tags: [User]
 *          summary: Upload Profile Picture
 *          parameters:
 *              - in: formData
 *                name: photo
 *                required: true
 *                description: upload profile picture
 *                schema:
 *                  type: file
 *          responses:
 *              200:
 *                  description: Profile Picture uploaded
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successUploadProfilePicture'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              401:
 *                  description: Unauthorized Access
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unauthorisedAccess'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 *
 *      delete:
 *          security:
 *              - bearerAuth: []
 *          tags: [User]
 *          summary: Delete Profile Picture
 *          responses:
 *              200:
 *                  description: Profile Picture Deleted
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successDeleteProfilePicture'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              401:
 *                  description: Unauthorized Access
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unauthorisedAccess'
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
 * /user/password:
 *      put:
 *          security:
 *              - bearerAuth: []
 *          tags: [User]
 *          summary: Change User Password
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/changePassword'
 *          responses:
 *              200:
 *                  description: Change User Password
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successChangePassword'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              401:
 *                  description: Unauthorized Access
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ef: '#/components/schemas/unauthorisedAccess'
 *              500:
 *                  description: Something went wrong try again
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ef: '#/components/schemas/unexpectedError'
 *
 */

