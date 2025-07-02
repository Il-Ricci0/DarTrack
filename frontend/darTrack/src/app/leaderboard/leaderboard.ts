import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AvatarSelectorComponent } from '../avatar-selector/avatar-selector.component';

@Component({
  selector: 'app-leaderboard',
  imports: [AvatarSelectorComponent],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.scss',
})
export class Leaderboard {
  authService = inject(AuthService);
}
