import { Component, ViewChild} from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  selectTab: any;
  @ViewChild('tabs') tabs: IonTabs | any;

  constructor() { }

  ngOnInit() {
  }

  setCurrentTab(event:any) {
    console.log(event);    
    this.selectTab = this.tabs.getSelected();
  }

}
