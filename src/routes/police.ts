import * as Router from 'koa-router';
import {
    addPoliceOfficer,
    removePoliceOfficer
} from '../controllers/police';
import * as compose from 'koa-compose';

const router = new Router({
  prefix: '/api/v1/police',
});

/**
 * @api       {post} /police Post
 * @apiName   Add Police Officer (Increase)
 * @apiGroup  Police
 * @apiParam  {String} fullName Name of police officer
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *   "meta": {
 *       "status": 200,
 *       "message": "success"
 *   },
 *   "data": {
 *       "id": 0,
 *       "fullName": "fullName",
 *       "roleId": 2,
 *       "updatedAt": "2019-05-25T08:12:31.019Z",
 *       "createdAt": "2019-05-25T08:12:31.019Z"
 *   }
 *  }
 *
 *
 * @apiError  {Attribute} required
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad-Request
 *     {
 *        "meta": {
 *          "statusCode": 400,
 *          "message": "\"{Key}\" is required",
 *        }
 *     }
 */
router.post('/', addPoliceOfficer);

/**
 * @api       {post} /police/:id Delete
 * @apiName   Remove Police Officer (Decrease)
 * @apiGroup  Police
 * @apiParam  {Number} id Id of a police officer
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *   "meta": {
 *       "status": 200,
 *       "message": "success"
 *   },
 *   "data": {
 *       "message": "Removed"
 *   }
 *  }
 *
 *
 * @apiError  {Attribute} required
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad-Request
 *     {
 *        "meta": {
 *          "statusCode": 400,
 *          "message": "\"{Key}\" is required",
 *        }
 *     }
 */
router.delete('/:id', removePoliceOfficer);

const routes = router.routes();
export default compose([
  routes
]);
