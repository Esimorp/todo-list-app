import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { SuccessBodyDto } from '../common';

export const ApiSuccessResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(SuccessBodyDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(SuccessBodyDto) },
          {
            properties: {
              data: {
                type: 'object',
                $ref: getSchemaPath(dataDto),
              },
            },
          },
        ],
      },
    }),
  );
