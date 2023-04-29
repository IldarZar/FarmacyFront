import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '@shared/models/user/user';

@Component({
  selector: 'app-bonus-card',
  templateUrl: './bonus-card.component.html',
  styleUrls: ['./bonus-card.component.scss'],
})
export class BonusCardComponent implements OnInit {
  currentUser$: Observable<User>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentUser$ = this.route.data.pipe(map(({ user }) => user as User));
  }
}
