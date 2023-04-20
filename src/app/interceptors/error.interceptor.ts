import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Error de red
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del servidor
          errorMessage = `Error status code ${error.status}: ${error.statusText}\n${error.error}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}