import { Component } from '@angular/core';
import { LocalizationService } from './shared/services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public constructor(private localizationService: LocalizationService) {}
  public switchLanguage(): void {
    const language: string = this.localizationService.currentLanguage === 'fr' ? 'en' : 'fr';
    this.localizationService.langue = language;
  }
}

