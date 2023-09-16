var deals = {};
var ndes = [];
var x = [];
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
        var sp = value.textContent.replaceAll(".","").replaceAll(",","").split(" ");
        var isMultiple = value.textContent.split("00").length > 2 ? true : false;
        var batt = value.textContent.toLocaleLowerCase().includes("mah");
        var phone_exist = value.textContent.toLocaleLowerCase().includes(name);
        console.log(value.textContent);
        if (isMultiple && phone_exist) {
            var num_data = value.textContent.toLowerCase().replaceAll(".","").replaceAll(" ","").split(name)[1];
            for (i=0; i<num_data.length; i++) {
                    if (parseInt(num_data.slice(i,6+i)) > (min) && parseInt(num_data.slice(i,6+i)) < (max)) {
                        deals_local.prices.push(parseInt(num_data.slice(i,6+i)));
                        deals_local.links.push(value.querySelectorAll("a")[value.querySelectorAll("a").length - 1]);
                        deals_local.date.push(value.previousElementSibling.querySelector("abbr").textContent);
                        deals_local.des.push(value.textContent);
                        console.log(parseInt(num_data.slice(i,6+i)));
                        break;
                    } else if ((parseInt(value.textContent.replaceAll(".","").replaceAll(" ","").match(/(\d+)/)[0]) < (max)) && (parseInt(value.textContent.replaceAll(".","").replaceAll(" ","").match(/(\d+)/)[0]) > min)) {
                        deals_local.prices.push(parseInt(value.textContent.replaceAll(".","").replaceAll(" ","").match(/(\d+)/)[0]));
                        deals_local.links.push(value.querySelectorAll("a")[value.querySelectorAll("a").length - 1]);
                        deals_local.date.push(value.previousElementSibling.querySelector("abbr").textContent);
                        deals_local.des.push(value.textContent);

                        console.log(parseInt(value.textContent.replaceAll(".","").replaceAll(" ","").match(/(\d+)/)[0]));
                        break;
                    }
            }
        } else {
            for (i=0; i<sp.length; i++) {
                if (sp[i].includes("00") && !(sp[i].includes("https")) && phone_exist) {
                    if (parseInt(sp[i].match(/(\d+)/)[0]) > (min) && parseInt(sp[i].match(/(\d+)/)[0]) < (max)) {            
                        deals_local.prices.push(parseInt(sp[i].match(/(\d+)/)[0]));
                        deals_local.links.push(value.querySelectorAll("a")[value.querySelectorAll("a").length - 1]);
                        deals_local.date.push(value.previousElementSibling.querySelector("abbr").textContent);
                        deals_local.des.push(value.textContent);

                        console.log(parseInt(sp[i].match(/(\d+)/)[0]));
                        break;
                    }
                }
            }
        }
    });
    deals = deals_local;
    ndes = des;
    for (i=0; i<deals.prices.length; i++) {
        x.push(deals.prices[i] + " " + deals.links[i] + "\n" + deals.date[i] + "\n" + deals.des[i]);
    }
    x = x.sort();
    console.log("*****************************************");
    for (i=0; i<x.length; i++) {
        if(x[i].includes("2022") || months[x[i].split(" ")[2]] < 5) {
            continue;
        } else {
            console.log(x[i]);
        }
    }
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
    } else if (stat === "old") {
        window.location.href = "https://m.facebook.com/search/posts/?q=" + b + "&source=filter&isTrending=0&tsid=0.21427538263446388";
    } else if (stat === "mine") {
        window.location.href = "https://m.facebook.com/search/posts?q=" + b + "&filters=eyJycF9hdXRob3I6MCI6IntcIm5hbWVcIjpcIm15X2dyb3Vwc19hbmRfcGFnZXNfcG9zdHNcIixcImFyZ3NcIjpcIlwifSJ9";
    }
}