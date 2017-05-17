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
    this.getSampleData();
  }



  generateSampleSalesData() {
    this.getSampleData();


    //this.salesData = [];
    //const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //for (let i = 1; i <= 12; i++) {
    //  this.salesData.push([
    //    months[i - 1] + " " + this.currentYear,
    //    Math.floor(Math.random() * 1000)
    //  ]);
    //}

    //console.log("generate: ", this.salesData);

  }

  getSampleData() {
    return this.http.fetch("/api/SalesData/GenerateRandomSalesData")
      .then(result => result.json() as Promise<ISalesData[]>)
      .then(data => {

        for (let i = 0; i < data.length; i++) {
          this.salesData.push([data[i].monthYear, data[i].monthSales]);
        }
      });
  }

}
