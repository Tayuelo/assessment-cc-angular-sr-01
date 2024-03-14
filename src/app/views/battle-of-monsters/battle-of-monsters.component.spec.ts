import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MonsterBattleCardComponent } from '../../components/monster-battle-card/monster-battle-card.component';
import { MonsterListComponent } from '../../components/monster-list/monster-list.component';
import { WinnerDisplayComponent } from '../../components/winner-display/winner-display.component';
import { Monster } from '../../interfaces/monster.interface';
import { MonstersService } from '../../services/monsters.service';
import { mockMonsters } from '../../__mocks__/monsters';
import { BattleOfMonstersComponent } from './battle-of-monsters.component';
import { By } from '@angular/platform-browser';

describe('BattleOfMonstersComponent', () => {
  let component: BattleOfMonstersComponent;
  let fixture: ComponentFixture<BattleOfMonstersComponent>;
  let monsterService: MonstersService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        BattleOfMonstersComponent,
        MonsterListComponent,
        WinnerDisplayComponent,
        MonsterBattleCardComponent,
      ],
      providers: [MonstersService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleOfMonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    monsterService = TestBed.inject(MonstersService);

    const response: Monster[] = mockMonsters.monsters;
    jest.spyOn(monsterService, 'getAll').mockReturnValue(of(response));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all list monsters', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.monsters.length).toBe(5);
  }));

  it('should show the main page', () => {
    expect(
      fixture.debugElement.query(By.css('span')).properties['innerHTML']
    ).toEqual('Battle of Monsters');
  });

  it('should select a monster', fakeAsync(() => {
    component.monsterSelected(mockMonsters.selectedMonster);
    fixture.detectChanges();
    tick();
    const buttonStartBattle = fixture.nativeElement.querySelector('button');
    expect(buttonStartBattle.disabled).toBeFalsy();
  }));

  it('should unselect a monster', () => {
    component.monsterSelected(null);
    const buttonStartBattle = fixture.nativeElement.querySelector('button');
    expect(buttonStartBattle.disabled).toBeTruthy();
  });

  it('should start battle', fakeAsync(() => {
    const spy = jest.spyOn(monsterService.versus, 'next');
    component.player = mockMonsters.selectedMonster;
    component.computer = mockMonsters.selectedRandomMonster;
    component.startBattle();
    tick();
    expect(spy).toHaveBeenCalledWith({
      monster1Id: mockMonsters.selectedMonster.id,
      monster2Id: mockMonsters.selectedRandomMonster.id,
    });
  }));

  it('should start battle with null values', fakeAsync(() => {
    const spy = jest.spyOn(monsterService.versus, 'next');
    component.player = null;
    component.computer = null;
    component.startBattle();
    tick();
    expect(spy).toHaveBeenCalledWith({
      monster1Id: null,
      monster2Id: null,
    });
  }));
});
