import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  constructor(private i18nService: I18nService) {}

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = 500;
    let errorMessage = await this.i18nService.t('SYSTEM_ERROR');
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage = exception.message;
    }
    response.status(status).json({
      message: errorMessage,
      stack: exception.stack,
    });
  }
}
