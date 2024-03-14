import { Component, OnInit } from '@angular/core';
import { Monster } from '../../interfaces/monster.interface';
import { MonstersService } from '../../services/monsters.service';
import { getRandomObject } from '../../helpers/array-helpers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-battle-of-monsters',
  templateUrl: './battle-of-monsters.component.html',
  styleUrls: ['./battle-of-monsters.component.scss'],
})
export class BattleOfMonstersComponent implements OnInit {
  public player!: Monster | null;
  public computer!: Monster | null;
  public monsters: Monster[] = [];
  public winner$: Observable<string | null> = this.monsterService.winner$;

  constructor(private monsterService: MonstersService) {}

  ngOnInit(): void {
    this.monsterService.getAll().subscribe((res) => {
      this.monsters = res;
    });
  }

  monsterSelected(monster: Monster | null) {
    this.player = monster;
    this.computer = getRandomObject(this.monsters, monster);
    this.monsterService.versus.next(null);
  }

  startBattle() {
    this.monsterService.versus.next({
      monster1Id: this.player?.id || null,
      monster2Id: this.computer?.id || null,
    });
  }
}
