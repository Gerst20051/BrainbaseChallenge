import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {
  day = 1;
  date = 'Monday, June 15, 2015';

  constructor() {}

  ngOnInit(): void {}
}
