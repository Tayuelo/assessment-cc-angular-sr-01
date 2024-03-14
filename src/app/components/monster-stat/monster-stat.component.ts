import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-monster-stat',
    styleUrls: ['./monster-stat.component.scss'],
    templateUrl: './monster-stat.component.html'
})
export class MonsterStatComponent {
    @Input() stat!: number;
    @Input() title!: string;
}