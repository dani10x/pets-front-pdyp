import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorService } from "../services/error.service";
import { Observable } from "rxjs";

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return new Observable((observer) => {
      next.handle(request).subscribe(
        (res: HttpEvent<any>) => {
          if (res instanceof HttpResponse) {
            observer.next(res);
            observer.complete();
          }
        },
        (err: HttpErrorResponse) => {
          this.errorService.handleError(err);
          observer.complete();
        }
      )
    });
  }


}
