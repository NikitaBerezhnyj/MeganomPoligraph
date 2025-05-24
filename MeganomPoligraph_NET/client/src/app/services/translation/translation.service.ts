import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TranslationService {
  constructor(private translate: TranslateService) {}

  get translateService() {
    return this.translate;
  }

  translateKey(key: string, params?: object): Observable<string> {
    return this.translate.get(key, params);
  }

  translateKeyAsync(key: string, params?: object): Promise<string> {
    return this.translate.get(key, params).toPromise();
  }

  translateMultipleKeys(keys: string[]): Promise<Record<string, string>> {
    return this.translate.get(keys).toPromise();
  }
}
