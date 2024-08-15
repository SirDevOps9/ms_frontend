import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";

export class MultiTranslateHttpLoader implements TranslateLoader {
    resources: Resource[];
    withCommon: boolean;
  
    constructor(
      private readonly http: HttpClient,
      { resources, withCommon = true }: { resources: Resource[], withCommon?: boolean }
    ) {
      this.resources = resources;
      this.withCommon = withCommon;
    }
  
    getTranslation(lang: string): Observable<Record<string, unknown>> {
      let resources: Resource[] = [...this.resources];
  
      if (this.withCommon) {
        // order matters! like this, all translations from common can be overridden with features' translations
        resources = [
          { prefix: './assets/langs/shared/', suffix: '.json' }, 
          ...resources
        ];
      }
  
      return forkJoin(resources.map((config: Resource) => {
        return this.http.get<Record<string, unknown>>(`${config.prefix}${lang}${config.suffix}`);
      })).pipe(
        map((response: Record<string, unknown>[]) => 
          this.mergeObjectsRecursively(response) as Record<string, unknown>),
      );
    }

    private mergeObjectsRecursively(objects: Record<string, unknown>[]): Record<string, unknown> {
      const mergedObject: Record<string, unknown> = {};

      for (const obj of objects) {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              mergedObject[key] = this.mergeObjectsRecursively([mergedObject[key] as Record<string, unknown>, obj[key] as Record<string, unknown>]);
            } else {
              mergedObject[key] = obj[key];
            }
          }
        }
      }

      return mergedObject;
    } 
}

export type Resource = { prefix: string; suffix: string };
