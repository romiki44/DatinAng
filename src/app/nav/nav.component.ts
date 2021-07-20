import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe(
      (res) => {
        console.log(res);
        const username =
          this.model.username.charAt(0).toUpperCase() +
          this.model.username.slice(1);
        this.toastr.success(username + ' has logged in.');
        this.router.navigateByUrl('/members');
      },
      (error) => {
        console.log(error);
        if (error.error) {
          this.toastr.error(error.error);
        } else {
          this.toastr.error(error);
        }
      }
    );
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
