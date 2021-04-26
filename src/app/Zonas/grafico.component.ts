import { Component, VERSION ,OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {Ventas} from '../entidades/ventas';
import {ZonasService} from '../services/zonas.service';

import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);
@Component({
  selector: 'app-grafica',
  templateUrl: './grafico.component.html',
  styleUrls: [ './grafico.component.css' ],
  providers:[ZonasService]
})
export class GraficoComponent  implements OnInit{


  public activity;
  public error:boolean=false;;
  public   json = '[';
  public xData;
  public label;
  public totales:Ventas[]=[];
  public data=[
    ['Zona 1', 15000.00],
    ['Zona 2', 5000.00],
    ['Zona 4', 35000.00],
    ['Zona 5', 46000.00],
    ['Zona 6', 3000.00],
    ['Zona 7', 56000.00],
    ['Zona 8', 25000.00],

 ];
  options:any;


  constructor(private _zonasservice:ZonasService)
  {


  }

  ngOnInit()
  {
    this.GetVentas();
  }


  initGraph(source:any){
    this.options = {
      chart: {
          type: 'pie',
          options3d: {
              enabled: true,
              alpha: 45
          }
      },
      title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      plotOptions: {
          pie: {
              innerSize: 100,
              depth: 45
          }
      },
      series: [{
          name: 'Ventas $ ',
          data:
         source

      }]
  };
  Highcharts.chart('container', this.options);
  }

  GetVentas()
  {


    this._zonasservice.GetVentas().subscribe(
      res =>
      {

        if(false)
        {
          this.totales = res.entity;

          for (let i=0; i < this.totales.length; i++)
          {
              this.json = this.json +'["'+this.totales[i].descripcion+ '",' + this.totales[i].ventasTotales + (this.totales.length== i+1?']]':'],' );

          }

          this.initGraph(this.totales.length > 1?JSON.parse(this.json):this.data)

        }else
        {
          this.initGraph(this.data);
          console.log(res.message);
          this.error=true;
        }
      },
      err =>
      {

        this.initGraph(this.data);
      }


    );

  }
}
