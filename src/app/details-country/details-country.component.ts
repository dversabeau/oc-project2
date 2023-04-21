import {Component, OnDestroy, OnInit} from '@angular/core';
import {OlympicService} from "../core/services/olympic.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Participation} from "../core/models/Participation";

@Component({
  selector: 'app-details-country',
  templateUrl: './details-country.component.html',
  styleUrls: ['./details-country.component.scss']
})
export class DetailsCountryComponent implements OnInit, OnDestroy {
  olympicCountry!: Subscription;
  name!: string | undefined;

  totalNumberOfAthletes: number = 0;
  totalNumberOfMedals: number = 0;

  participations!: Participation[] | undefined;

  x: number[] = [];
  y: number[] = [];

  constructor(private olympicsService: OlympicService,
              private route: ActivatedRoute) {
  }

  public graph = {
    data: [
      {
        x: this.x,
        y: this.y,
        type: 'scatter',
        hovertemplate: '%{y} medals<extra></extra>',
        textinfo: 'label',
        showlegend:false,

      }],
    layout: {
      width: 500,
      height: 400
    }
  };

  ngOnInit(): void {
    const idCountry = +this.route.snapshot.params['id'];
    this.olympicCountry = this.olympicsService.getOlympicCountryById(idCountry).subscribe(
      country => {
        this.name = country?.country;
        this.participations = country?.participations
        this.participations?.map(participation => {
          this.x.push(participation.year);
          this.y.push(participation.medalsCount)
          this.totalNumberOfAthletes = this.totalNumberOfAthletes + participation.athleteCount
          this.totalNumberOfMedals = this.totalNumberOfMedals + participation.medalsCount
        })
      }
    );
  }

  ngOnDestroy(): void {
    this.olympicCountry.unsubscribe();
  }

}
