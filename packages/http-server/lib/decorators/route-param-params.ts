import { RouteParam } from './route-param';

export function Params(name?: string): ParameterDecorator {
  return RouteParam(request => {
    return name ? request.params[name] : request.params;
  });
}
