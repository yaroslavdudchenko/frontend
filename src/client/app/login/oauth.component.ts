import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { AccountService } from '../core/services/account.service';

@Component({
  moduleId: module.id,
  selector: 'bs-oauth',
  templateUrl: 'oauth.component.html'
})
export class OAuthComponent implements OnInit {
  constructor(protected _accountService: AccountService,
              protected _authService: AuthService,
              protected _activatedRoute: ActivatedRoute,
              protected _router: Router) {
  }

  public ngOnInit(): void {
    this._activatedRoute.params.forEach((params: Params) => {
      let provider = params['provider'];

      this._activatedRoute.queryParams.forEach((params: Params) => {
        let code = params['code'];

        this._accountService.authenticate(provider, code).subscribe(token => {
          if (token) {
            this._authService.saveToken(token);
            this._router.navigate(['/']);
          } else {
            this._router.navigate(['/login']);
          }
        });
      });
    });
  }
}
