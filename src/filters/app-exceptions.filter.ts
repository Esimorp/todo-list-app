import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nService, I18nValidationException } from 'nestjs-i18n';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  constructor(
    private i18nService: I18nService,
    private readonly logger: Logger,
  ) {}

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = 500;
    const lang = ctx.getRequest()['i18nLang'];
    let errorMessage = await this.i18nService.t('errors.SYSTEM_ERROR', {
      lang,
    });
    if (exception instanceof I18nValidationException) {
      const constraints = (exception as I18nValidationException).errors[0]
        .constraints;
      const firstConstraintKey = Object.keys(constraints)[0];
      errorMessage = constraints[firstConstraintKey];
      status = exception.getStatus();
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage = await this.i18nService.t(exception.message, {
        lang,
      });
    } else {
      this.logger.error(exception);
    }
    response.status(status).json({
      message: errorMessage,
      stack: exception.stack,
    });
  }
}
