import { Component, OnInit } from '@angular/core';
import { faLocation, faShoppingCart, faBoxes, faHouse, faKitMedical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent implements OnInit {

  faLocation = faLocation;
  faShop = faShoppingCart; 
  faBoxes = faBoxes;
  faHouse = faHouse;
  faKitMedical = faKitMedical;

  constructor() { }

  ngOnInit(): void {
  }
}
