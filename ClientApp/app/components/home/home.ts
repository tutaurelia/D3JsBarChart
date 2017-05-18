import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";

interface ISalesData {
  monthYear: string;
  monthSales: number;
}

@inject(HttpClient)
export class Home {
  salesData: Array<any> = [];
  currentYear = new Date().getFullYear();

  constructor(private http: HttpClient) {
    this.fetchSalesData();
  }
  
  generateRandomSalesData() {
    this.fetchSalesData();
  }

  fetchSalesData() {
    //get data from SalesDataController
    this.http.fetch("/api/SalesData/GenerateRandomSalesData")
      .then(result => result.json() as Promise<ISalesData[]>)
      .then(data => {
        this.salesData = [];
        for (let i = 0; i < data.length; i++) {
          this.salesData.push([data[i].monthYear, data[i].monthSales]);
        }
        console.clear();
        console.log("SalesData FROM SalesDataController: ", this.salesData);
      });

    //or generate random data without call to SalesDataController
    //this.salesData = [];
    //const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //for (let i = 1; i <= 12; i++) {
    //  this.salesData.push([
    //    months[i - 1] + " " + this.currentYear,
    //    Math.floor(Math.random() * 1000)
    //  ]);
    //}
    //console.clear();
    //console.log("SalesData NOT FROM SalesDataController: ", this.salesData);
  }

}
