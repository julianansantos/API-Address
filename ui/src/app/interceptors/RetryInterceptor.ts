import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {retry, tap} from 'rxjs/operators';
export const RETRY_COUNT = new HttpContextToken(() => 0);
export const ERROR_COUNT = new HttpContextToken(() => 0);

export class RetryInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const retryCount = req.context.get(RETRY_COUNT);

    return next.handle(req).pipe(
        tap({
              // An error has occurred, so increment this request's ERROR_COUNT.
             error: () => req.context.set(ERROR_COUNT, req.context.get(ERROR_COUNT) + 1)
            }),
        // Retry the request a configurable number of times.
        retry(retryCount),
    );
  }
}