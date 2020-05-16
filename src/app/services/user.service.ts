import { Injectable } from '@angular/core';
import { RxCacheItem, RxCacheService } from 'ngx-rxcache';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';
import { PeeringService } from './peering.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: RxCacheItem<User>;
  private user$;

  constructor(
    private readonly cache: RxCacheService,
    private readonly peeringService: PeeringService
  ) {
    this.user = cache.get<User>({
      id: 'user',
      construct: this.initUser,
      autoload: true,
    });

    this.user$ = this.user.value$;
  }

  get$ = () => this.user$;

  update = (value) => this.user.update(value);

  initUser = (): Observable<User> => {
    return this.peeringService.getId$().pipe(
      take(2),
      switchMap((id) => {
        return of({
          id,
          name: '',
        });
      })
    );
  };
}
