var deals = {};
var ndes = [];
var x = [];
var clean = "";
var isMultiple = "";
var batt = "";
var phone_exist = "";
var num_data = "";
var price = "";
var months = {
    "January": 1,
    "February":2,
    "March":3,
    "April":4,
    "May":5,
    "June":6,
    "July":7,
    "August":8,
    "September":9,
    "October":10,
    "November":11,
    "December":12
};
function scraper(name, min, max) {
    scrolling = setInterval(function () {
        scrollBy(0, document.body.scrollHeight);
        console.log("scrolling ...");
        if (document.getElementsByClassName("img _55ym _55yq _55yo").length === 1) {
            scrollBy(0, document.body.scrollHeight);
            clearInterval(scrolling);
            console.log("stopped .");
            var fg = document.getElementsByClassName("_5rgt _5nk5 _5wnf _5msi");
    var sg = document.getElementsByClassName("_5rgt _5nk5 _5msi");
    var des = [];
    var deals_local = {
        "prices": [],
        "links": [],
        "date": [],
        "des": []
    };
    for (i=0; i<fg.length; i++) {
        des.push(fg[i]);
    }
    for (i=0; i<sg.length; i++) {
        des.push(sg[i]);
    }
    des.forEach(function (value, index, array) {
        clean = value.textContent.replaceAll(".","").replaceAll(",","").toLocaleLowerCase();
        isMultiple = value.textContent.split("00").length > 3 ? true : false;
        batt = value.textContent.toLocaleLowerCase().includes("mah");
        phone_exist = value.textContent.toLocaleLowerCase().includes(name);
        console.log(value.textContent);
        num_data = clean.replaceAll(" ","").split(name)[1];
        price = isMultiple && phone_exist && num_data.match(/\d+/g) !== null ? num_data.match(/\d+/g).filter(e => e.includes("00") && e.length >= Math.abs(min).toString().length && e.length <= Math.abs(max).toString().length+2 && parseInt(e.slice(0,5)) >= min && parseInt(e.slice(0,5)) <= max )[0] : clean.match(/\d+/g) !== null ? clean.match(/\d+/g).filter(e => e.includes("00") && e.length >= Math.abs(min).toString().length && e.length <= Math.abs(max).toString().length+2 && parseInt(e.slice(0,5)) >= min && parseInt(e.slice(0,5)) <= max )[0] : null;
        if (isMultiple && phone_exist && price !== undefined) {
            deals_local.prices.push(price.slice(0,5));
            deals_local.links.push(value.querySelectorAll("a")[value.querySelectorAll("a").length - 1]);
            deals_local.date.push(value.previousElementSibling.querySelector("abbr").textContent);
            deals_local.des.push(value.textContent);
            console.log(price.includes("0000") ? price.slice(0,5) : price);
        } else if (clean.match(/\d+/g) !== null && price !== undefined) {
            var price_2 = clean.match(/\d+/g).filter(e => e.includes("00") && e.length >= Math.abs(min).toString().length && e.length <= Math.abs(max).toString().length+2 && parseInt(e.slice(0,5)) >= min && parseInt(e.slice(0,5)) <= max )[0];
            deals_local.prices.push(price_2.slice(0,5));
            deals_local.links.push(value.querySelectorAll("a")[value.querySelectorAll("a").length - 1]);
            deals_local.date.push(value.previousElementSibling.querySelector("abbr").textContent);
            deals_local.des.push(value.textContent);
            console.log(price_2.includes("0000") ? price_2.slice(0,5) : price_2);
        }
    });
    deals = deals_local;
    ndes = des;
    for (i=0; i<deals.prices.length; i++) {
        if (deals.date[i].includes("2022") || months[deals.date[i].split(" ")[0]] < 7) {
            deals.prices[i] = 0;
        } else {
            x.push(deals.prices[i] + " " + deals.links[i] + "\n" + deals.date[i] + "\n" + deals.des[i]);
        }
    }
    x = x.sort();
    console.log("*****************************************");
    for (i=0; i<x.length; i++) {
        console.log(x[i]);
    }
    console.log("*****************************************");
    const maxi = Math.max(...deals.prices.map(e => parseFloat(e)));
    const mini = Math.min(...deals.prices.filter(e => e !== 0).map(e => parseFloat(e)));
    const sum = deals.prices.map(e => parseFloat(e)).reduce((accumulator, value) => accumulator + value, 0);
    console.log(`The minimum price is at ${mini} The maximum is ${maxi} and the average is ${sum/(deals.prices.filter(e => e !== 0).length)}`);
        }
    }, 100);
    
}
function search(name, stat) {
    var sp = name.split(" ");
    var b = "";
    for (i=0; i<sp.length; i++) {
            if (i === 0) {
                b += sp[i];
            } else {
                b += ("%20"+sp[i]);
            }
        }
    if (stat === "new") {
        window.location.href = "https://m.facebook.com/search/posts?q="+ b +"&filters=eyJyZWNlbnRfcG9zdHM6MCI6IntcIm5hbWVcIjpcInJlY2VudF9wb3N0c1wiLFwiYXJnc1wiOlwiXCJ9In0%3D";
        window.open("https://m.facebook.com/search/posts?q="+ b +"%20da&filters=eyJyZWNlbnRfcG9zdHM6MCI6IntcIm5hbWVcIjpcInJlY2VudF9wb3N0c1wiLFwiYXJnc1wiOlwiXCJ9In0%3D",'_blank');
        window.open("https://m.facebook.com/search/posts?q="+ b +"%2058&filters=eyJyZWNlbnRfcG9zdHM6MCI6IntcIm5hbWVcIjpcInJlY2VudF9wb3N0c1wiLFwiYXJnc1wiOlwiXCJ9In0%3D",'_blank');
    } else if (stat === "old") {
        window.location.href = "https://m.facebook.com/search/posts/?q=" + b + "&source=filter&isTrending=0&tsid=0.21427538263446388";
    } else if (stat === "mine") {
        window.location.href = "https://m.facebook.com/search/posts?q=" + b + "&filters=eyJycF9hdXRob3I6MCI6IntcIm5hbWVcIjpcIm15X2dyb3Vwc19hbmRfcGFnZXNfcG9zdHNcIixcImFyZ3NcIjpcIlwifSJ9";
    }
}