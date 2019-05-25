import * as compose from 'koa-compose';
import * as Bunyan from 'bunyan';
import * as KoaBunyan from 'koa-bunyan-logger';
import * as util from 'util';

export default (logger: Bunyan) => compose([
  // Attach logger to ctx
  KoaBunyan(logger),
  // Use child logger for request ctx
  KoaBunyan.requestIdContext(),
  KoaBunyan.requestLogger({
    formatRequestMessage() {
      return util.format(
        'Request %s %s %j',
        this.request.method,
        this.request.originalUrl,
        this.request.body
      );
    },
    formatResponseMessage(data: any) {
      return util.format(
        'Response (%d) %s %s in %sms',
        this.status,
        this.request.method,
        this.request.originalUrl,
        data.duration
      );
    }
  }),
]);
