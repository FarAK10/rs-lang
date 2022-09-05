import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { HardWords, IDayStatista, IUserStatista } from 'src/app/interfaces/interfaces';



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  dayStats: IDayStatista[] | string = [];
  sprintWords: IDayStatista[] = [];





  view: [number, number] = [700, 400];

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

  xAxisTicks: any[] = ['Genre 1', 'Genre 2', 'Genre 3', 'Genre 4', 'Genre 5', 'Genre 6', 'Genre 7']
  yAxisTicks: any[] = [1, 10, 20, 50, 70, 100]

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'

  activeEntries: any[] = ['book']
  barPadding: number = 5
  tooltipDisabled: boolean = false;

  yScaleMax: number = 9000;

  roundEdges: boolean = true;

  constructor(private authService: AuthorizationService) {}

  ngOnInit(): void {
  const dayStatista = this.authService.currentUserStatista.optional.dates;
 
  // if (typeof dayStatista === 'string'){
  //   JSON.parse(dayStatista);
  // }

  if (typeof dayStatista === 'string'){
    JSON.parse(dayStatista).forEach((element:IDayStatista[]) => {
    });
  }


  
  // this.sprintWords = this.arrSprintWords
  // this.arrSprintWords = lastDateStatista.optional.dates;
  console.log(dayStatista)


  }
  productSales: any = [
    {
      "name": "book",
      "value": this.sprintWords
    }, {
      "name": "graphic card",
      "value": 50
    }, {
      "name": "desk",
      "value": 60
    }, {
      "name": "laptop",
      "value": 40
    }
  ];

}