import {Component, OnInit} from '@angular/core';
import {Olympic} from "../core/models/Olympic";
import {OlympicService} from "../core/services/olympic.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pie-chart-component',
  templateUrl: './pie-chart-component.component.html',
  styleUrls: ['./pie-chart-component.component.scss']
})
export class PieChartComponentComponent implements OnInit {
  olympics$!: Observable<Olympic[]>;
  countries: string[] = [];
  yearsOfJOs: Set<number> = new Set<number>();
  values: number[] = [];
  totalMedals: number = 0;
  totalMedalsForCountry: number[] = [];

  constructor(private olympicService: OlympicService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.calculateTotalMedalsAndJOs();
    this.calculatePercentageCountries();
  }

  public graph = {
    data: [
      {
        values: this.values,
        labels: this.countries,
        text: this.totalMedalsForCountry,
        type: 'pie',
        hovertemplate: '%{label}<br>%{text} medals</br><br><br><extra><div class="medals-container"><i class="medals"></i></extra>',
        hovermode: "closest",
        textinfo: 'label',
        textposition:"outside",
        showlegend:false,

      }],
    layout: {
      height: 400,
      width: 400
    }
  };

  private calculatePercentageCountries() {
    this.olympics$.subscribe(
      olympics => olympics.map(olympic => {
        let totalMedalsForCountry = 0;
        olympic.participations.map((participation) => {
          totalMedalsForCountry += participation.medalsCount
        })
        this.totalMedalsForCountry.push(totalMedalsForCountry)
        this.values.push(totalMedalsForCountry / this.totalMedals * 100);
      })
    )
  }

  public click(pointerEvent: any){
    let param = pointerEvent.points[0].i + 1
    this.router.navigateByUrl(`/detailsCountry/${param}`)
  }

  private calculateTotalMedalsAndJOs() {
    this.olympics$.subscribe(
      olympics => olympics.map(olympic => {
        this.countries.push(olympic.country)
        olympic.participations.map((participation) => {
          this.totalMedals += participation.medalsCount
          this.yearsOfJOs.add(participation.year);
        })
      })
    )
  }

}
