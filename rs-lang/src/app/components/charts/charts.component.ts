import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { HardWords, IDayStatista, IUserStatista } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  dayStats: IDayStatista[] | string = [];
  sprintWords: IDayStatista[] = [];

  view: [number, number] = [
    700,
    400,
  ];

  // options
  legendTitle: string = 'Products';
  legend: boolean = false;

  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'Words';
  xAxisLabel: string = 'Dates';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  xAxisTicks: any[] = [
    'Genre 1',
    'Genre 2',
    'Genre 3',
    'Genre 4',
    'Genre 5',
    'Genre 6',
    'Genre 7',
  ];
  yAxisTicks: any[] = [
    1,
    10,
    20,
    50,
    70,
    100,
  ];

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  colorScheme = {
    domain: [
      '#704FC4',
      '#4B852C',
      '#B67A3D',
      '#5B6FC8',
      '#25706F',
    ],
  };
  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'

  activeEntries: any[] = ['book'];
  barPadding: number = 5;
  tooltipDisabled: boolean = false;

  yScaleMax: number = 9000;

  roundEdges: boolean = true;

  dayStatistas!: Array<{
    name: string;
    value: number;
  }>;

  constructor(private authService: AuthorizationService) {}

  ngOnInit(): void {
    this.dayStatistas = (this.authService.currentUserStatista.optional.dates as IDayStatista[]).map(
      (day) => {
        const date = new Date(day.date);
        const dateNumber = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        return {
          name: dateNumber,
          value: day.audio.newWords.length + day.sprint.newWords.length,
        };
      },
    );
    console.log('daystatista', this.dayStatistas);
  }
}
