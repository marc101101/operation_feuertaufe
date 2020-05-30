import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { DataService } from './data.service';
import { timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
declare var require: any;
var chartJs = require('chart.js');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('chartElementContainer') chartContainer: ElementRef;
  title = 'app';

  history_data = {
    datasets: [
      {
        label: 'dht_humidity',
        backgroundColor: 'rgba(0, 153, 255, 0.5)',
        borderColor: 'rgba(0, 153, 255, 0.5)',
        data: [],
      },
      {
        label: 'dht_temperature',
        backgroundColor: 'rgba(255, 0, 102, 0.5)',
        borderColor: 'rgba(255, 0, 102, 0.5)',
        data: [],
      },
      {
        label: 'idu_sound',
        backgroundColor: 'rgba(51, 204, 51, 0.5)',
        borderColor: 'rgba(51, 204, 51, 0.5)',
        data: [],
      },
      {
        label: 'gas_lpg',
        backgroundColor: 'rgba(255, 153, 0, 0.5)',
        borderColor: 'rgba(255, 153, 0, 0.5)',
        data: [],
      },
      {
        label: 'gas_co',
        backgroundColor: 'rgba(0, 153, 153, 0.5)',
        borderColor: 'rgba(0, 153, 153, 0.5)',
        data: [],
      },
      {
        label: 'gas_smoke',
        data: [],
      },
    ],
  };

  current_data = {
    timestamp: 0,
    dht_humidity: 0,
    dht_temperature: 0,
    idu_sound: '',
    gas_lpg: 0,
    gas_co: 0,
    gas_smoke: 0,
  };

  show = false;

  constructor(public dataService: DataService) {}

  ngOnInit() {
    const reloadInterval = 60000;

    timer(10, reloadInterval)
      .pipe(mergeMap((_) => this.dataService.getData()))
      .subscribe(
        (result) => {
          this.processData(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  processData(data) {
    data = data.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
    this.current_data = data[0];

    this.history_data.datasets.forEach((history_data_object) => {
      data.forEach((data_element) => {
        let to_add = {
          y: data_element[history_data_object.label],
          x: data_element.timestamp,
        };
        history_data_object.data.push(to_add);
      });
    });
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.show = true;
    let ctx: CanvasRenderingContext2D = this.chartContainer.nativeElement.getContext(
      '2d'
    );
    var data_chart = this.history_data;

    var myLineChart = new chartJs(ctx, {
      type: 'line',
      data: data_chart,
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'second',
              },
            },
          ],
        },
      },
    });
  }
}
