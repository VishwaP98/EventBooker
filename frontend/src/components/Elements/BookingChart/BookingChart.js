import React from "react";
import {Bar} from "react-chartjs";

const numCategories = 3;
const EVENT_PRICING_CATEGORIES = {
    "cheap" : 100,
    "average" : 250,
    "expensive" : 1000
}

const bookingChart = props => {

    var priceCategories = new Array(numCategories);

    let priceCategoryIndex = 0;

    for (const item in EVENT_PRICING_CATEGORIES) {
        priceCategories[priceCategoryIndex] = item;
        priceCategoryIndex += 1;
    }

    var priceArray = new Array(numCategories).fill(0);

    props.bookings.forEach(element => {
        const price = element.event.price;

        let index = 0;

        for (const item in EVENT_PRICING_CATEGORIES) {

            if(price <= EVENT_PRICING_CATEGORIES[item]) {
                priceArray[index] += 1
                break;
            }

            index += 1;
        }

    });

    console.log(priceCategories)
    console.log(priceArray)

    var data = {
        labels: priceCategories,
        datasets: [
            {
                //label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: priceArray
            }
        ]
    };

    var options = {
        barValueSpacing : 25
    }

    return (<div style={ {textAlign: "center"} }>
        <Bar data={data} options={options}/>
    </div>); 
    
}

export default bookingChart;