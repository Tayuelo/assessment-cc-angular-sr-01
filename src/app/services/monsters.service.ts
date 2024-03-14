import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BattlePayload, BattleResult, Monster } from '../interfaces/monster.interface';
import { Observable, Subject, map, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MonstersService {
  public versus = new Subject<BattlePayload | null>;
  private versus$ = this.versus.asObservable();
  public winner$: Observable<string | null>;

  constructor(private http: HttpClient) {
    this.winner$ = this.versus$.pipe(
      switchMap((versus) => {
        return versus ? this.http.post<BattleResult>(`${environment.API_URL}/battle`, versus) : of(null);
      }),
      map((response) => response?.winner?.name || null)
    );
  }

  getAll(): Observable<Monster[]> {
    return this.http.get<Monster[]>(`${environment.API_URL}/monsters`);
  }
}
