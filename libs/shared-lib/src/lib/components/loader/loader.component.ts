import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.loaderState.subscribe((state) => {
      this.isLoading = state;
    });
  }
}
