import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '@shared/models/user/user';
import {AppState} from "@app/store/app/app.state";
import {Select} from "@ngxs/store";

@Component({
  selector: 'app-bonus-card',
  templateUrl: './bonus-card.component.html',
  styleUrls: ['./bonus-card.component.scss'],
})
export class BonusCardComponent implements OnInit {
  @Select(AppState.getUser)
  user$: Observable<User>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  }
}
