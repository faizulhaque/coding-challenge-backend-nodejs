import * as Router from 'koa-router';
import {
    resolveCase
} from '../controllers/case';
import * as compose from 'koa-compose';

const router = new Router({
  prefix: '/api/v1/case',
});

/**
 * @api       {post} /case/:id/resolved Resolve Case
 * @apiName   Resolved Case
 * @apiGroup  Case
 * @apiVersion 1.0.0
 * @apiParam  {Number} id Case Id
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *   "meta": {
 *       "status": 200,
 *       "message": "success"
 *   },
 *   "data": "Success"
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
router.post('/:id/resolved', resolveCase);

const routes = router.routes();
export default compose([
  routes
]);
