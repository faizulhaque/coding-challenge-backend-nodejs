import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import * as Logger from 'bunyan';

export class SBCPLogger {
  private logDir: string;
  private logFile: string;
  private logErrorFile: string;
  private name: string;

  constructor(name: string) {
    this.name = name;
    this.logDir = join(__dirname, '../../logs');
    this.logFile = join(this.logDir, 'debug.json');
    this.logErrorFile = join(this.logDir, 'error.json');

    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir);
    }
  }

  public createLogger(): Logger {
    const streams: Logger.Stream[] = [
      {
        stream: process.stdout,
        level: 'debug'
      },
      {
        path: this.logFile,
        level: 'debug',
        type: 'rotating-file',
        period: '1d'
      },
      {
        path: this.logErrorFile,
        level: 'error',
        type: 'rotating-file',
        period: '1d'
      }
    ];

    return Logger.createLogger({
      name: this.name,
      streams
    });
  }
}
