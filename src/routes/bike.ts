import * as Router from 'koa-router';
import {
    report,
    searchBike
} from '../controllers/bike';
import * as compose from 'koa-compose';

const router = new Router({
  prefix: '/api/v1/bike',
});

/**
 * @api       {post} /bike/report Report Stolen Bike
 * @apiName   Report Stolen Bike
 * @apiGroup  Bike
 * @apiVersion 1.0.0
 * @apiParam  {String} fullName Name of bike owner
 * @apiParam  {String} licenseNumber licenseNumber of bike
 * @apiParam  {String} color color of stolen bike
 * @apiParam  {String} type bike type
 * @apiParam  {String} date Theft Date
 * @apiParam  {String} description Theft Description
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *   "meta": {
 *       "status": 200,
 *       "message": "success"
 *   },
 *   "data": {
 *       "caseId": 29
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
router.post('/report', report);

/**
 * @api       {get} /bike Search Stolen Bike
 * @apiName   Search Stolen Bike
 * @apiGroup  Bike
 * @apiVersion 1.0.0
 * @apiParam  {String} fullName Name of bike owner
 * @apiParam  {String} licenseNumber licenseNumber of bike
 * @apiParam  {String} color color of stolen bike
 * @apiParam  {String} type bike type
 * @apiParam  {String} date Theft Date
 * @apiParam  {String} description Theft Description
 * @apiParam  {Boolean} IsResolved Check either case is resolved
 * @apiParam  {Number} pageSize Page Size Default 10
 * @apiParam  {Number} pageNo Page no default 1
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *   "meta": {
 *       "status": 200,
 *       "message": "success"
 *   },
 *   "data": {
 *       "caseId": 29
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
router.get('/', searchBike);

const routes = router.routes();
export default compose([
  routes
]);
