using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;

namespace D3JsBarChartApp.Controllers
{
    [Route("api/[controller]")]
    public class SalesDataController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<SalesData> GenerateRandomSalesData()
        {
            var salesData = new List<SalesData>();
            var random = new Random();
            for (int i = 1; i <= 12; i++)
            {
                salesData.Add(new SalesData
                {
                    MonthYear = CultureInfo.CurrentCulture.DateTimeFormat.GetAbbreviatedMonthName(i) + " " + DateTime.Now.ToString("yyyy"),
                    MonthSales = random.NextDouble() * 5000
                });
            }
            return salesData;
        }
        public class SalesData
        {
            public string MonthYear { get; set; }
            public double MonthSales { get; set; }
        }
    }
}