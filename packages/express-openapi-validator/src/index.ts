import * as res from './resolvers';
import { OpenApiValidator, OpenApiValidatorOpts } from './openapi.validator';
import {
  OpenApiSpecLoader,
  InternalServerError,
  UnsupportedMediaType,
  RequestEntityTooLarge,
  BadRequest,
  MethodNotAllowed,
  NotAcceptable,
  NotFound,
  Unauthorized,
  Forbidden,
} from 'openapi-core';

export const resolvers = res;
export const middleware = openapiValidator;
export const error = {
  InternalServerError,
  UnsupportedMediaType,
  RequestEntityTooLarge,
  BadRequest,
  MethodNotAllowed,
  NotAcceptable,
  NotFound,
  Unauthorized,
  Forbidden,
};

function openapiValidator(options: OpenApiValidatorOpts) {
  const oav = new OpenApiValidator(options);
  exports.middleware._oav = oav;

  return oav.installMiddleware(
    new OpenApiSpecLoader({
      apiDoc: options.apiSpec,
      $refParser: options.$refParser,
    }).load(),
  );
}
