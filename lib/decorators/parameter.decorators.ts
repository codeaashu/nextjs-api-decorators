import type { NextApiRequest } from 'next';
import type { ParameterPipe } from '../pipes/ParameterPipe';

type ParamDecorator<T> = (req: NextApiRequest) => T;

export interface MetaParameter {
  index: number;
  location: 'query' | 'body' | 'header' | 'method' | 'request' | 'response' | 'params' | 'file' | 'files' | 'custom';
  name?: string;
  pipes?: ParameterPipe<any>[];
  fn?: ParamDecorator<any>;
}

export const PARAMETER_TOKEN = Symbol('instant:next:parameters');

function addParameter(
  location: MetaParameter['location'],
  name?: MetaParameter['name'],
  pipes?: ParameterPipe<any>[],
  fn?: ParamDecorator<any>
): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void {
    if (propertyKey === undefined) return; // <-- Add this guard
    const params: Array<MetaParameter> = Reflect.getMetadata(PARAMETER_TOKEN, target.constructor, propertyKey) ?? [];
    params.push({ index: parameterIndex, location, name, pipes, fn });
    Reflect.defineMetadata(PARAMETER_TOKEN, params, target.constructor, propertyKey);
  };
}

/** Returns the query string. */
export function Query(): ParameterDecorator;
/**
 * Returns a parameter from the query string.
 *
 * @param name Parameter name
 */
export function Query(name: string): ParameterDecorator;
/**
 * Returns a parameter from the query string with pipes applied.
 *
 * @param name Parameter name
 * @param pipes Pipes to be applied
 */
export function Query(name: string, ...pipes: ParameterPipe<any>[]): ParameterDecorator;
/**
 * Returns the query string with pipes applied.
 *
 * @param pipes Pipes to be applied
 */
export function Query(...pipes: ParameterPipe<any>[]): ParameterDecorator;
export function Query(nameOrPipes?: string | ParameterPipe<any>, ...pipes: ParameterPipe<any>[]): ParameterDecorator {
  if (typeof nameOrPipes === 'string') {
    return addParameter('query', nameOrPipes, pipes.length ? pipes : undefined);
  } else if (typeof nameOrPipes === 'function') {
    return addParameter('query', undefined, [nameOrPipes, ...pipes]);
  } else {
    return addParameter('query', undefined);
  }
}

/**
 * Returns a parameter from the URL path.
 *
 * @param name Parameter name
 */
export function Param(name: string): ParameterDecorator;
/**
 * Returns a parameter from the URL path with pipes applied.
 *
 * @param name Parameter name
 * @param pipes Pipes to be applied
 */
export function Param(name: string, ...pipes: ParameterPipe<any>[]): ParameterDecorator;
export function Param(name: string, ...pipes: ParameterPipe<any>[]): ParameterDecorator {
  return addParameter('params', name, pipes);
}

/** Returns the request body. */
export function Body(): ParameterDecorator;
/**
 * Returns the request body with pipes applied.
 *
 * @param pipes Pipes to be applied
 */
export function Body(...pipes: ParameterPipe<any>[]): ParameterDecorator;
export function Body(...pipes: ParameterPipe<any>[]): ParameterDecorator {
  return addParameter('body', undefined, pipes);
}

/**
 * Returns a parameter from the request header.
 *
 * @param name Parameter name
 */
export function Header(name: string): ParameterDecorator {
  return addParameter('header', name);
}

/** Returns the `req` object. */
export function Req(): ParameterDecorator {
  return addParameter('request');
}

/** Returns the `req` object. */
export function Request(): ParameterDecorator {
  return Req();
}

/** Returns the `res` object. */
export function Res(): ParameterDecorator {
  return addParameter('response');
}

/** Returns the `res` object. */
export function Response(): ParameterDecorator {
  return Res();
}

export function UploadedFile(): ParameterDecorator {
  return addParameter('file');
}

export function UploadedFiles(): ParameterDecorator {
  return addParameter('files');
}

export function createParamDecorator<T = any>(fn: ParamDecorator<T>): () => ParameterDecorator {
  return () => addParameter('custom', undefined, undefined, fn);
}
