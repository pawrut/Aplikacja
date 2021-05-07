import { createOptional } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Capability } from 'selenium-webdriver';
import { ApiService } from 'src/app/services/api.service';
import { Country } from 'src/app/types/api';

const REGION_OPTIONS = ['Polish Złoty', 'Americas', 'Asia', 'Europe', 'Oceania'];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private source: Country[];
  searchFilter?: string;
  regionFilter?: string;
  capitalFilter?: string;
  regionOptions = REGION_OPTIONS;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllCountries().subscribe((countries) => {
      this.source = countries;
    });
  }
  

  
  get countries() {
    return this.source
      ? this.source
          .filter((country) =>
            this.searchFilter
              ? country.name
                  .toLowerCase()
                  .includes(this.searchFilter.toLowerCase())
              : country
          )
          .filter((country) =>
            this.regionFilter
              ? country.currencies[0].name.includes(this.regionFilter)
              : country
          )
          .filter((country) =>
          this.capitalFilter
            ? country.capital
                .toLowerCase()
                .includes(this.capitalFilter.toLowerCase())
            : country
          )
      : this.source;
  }

}

