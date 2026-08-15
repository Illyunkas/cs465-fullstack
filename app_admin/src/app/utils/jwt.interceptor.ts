import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authentication } from '../services/authentication';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const authentication = inject(Authentication);
  const isAuthRequest = request.url.endsWith('/api/login') || request.url.endsWith('/api/register');

  if (!isAuthRequest && authentication.isLoggedIn()) {
    return next(request.clone({
      setHeaders: { Authorization: `Bearer ${authentication.getToken()}` },
    }));
  }

  return next(request);
};