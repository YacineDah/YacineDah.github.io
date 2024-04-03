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
function clean_price(num_data,min,max) {
    num_data = num_data.replace(",",".").replace(/(\d+)([a-zA-Z]+)/g, '$1 $2');
    var len_min = Math.abs(min).toString().length
    var len_max = Math.abs(max).toString().length
    var regex1 = new RegExp(`\\b\\d{${len_min}}\\b`, 'g');
    var regex2 = new RegExp(`\\b\\d{${len_min === 3 ? 1 : len_min-3}}\\.\\d{3}\\b`, 'g');
    var regex3 = new RegExp(`\\b\\d{${len_max}}\\b`, 'g');
    var regex4 = new RegExp(`\\b\\d{${len_max-3}}\\.\\d{3}\\b`, 'g');
    var price = num_data.match(regex2) !== null ? num_data.match(regex2) : num_data.match(regex1) !== null ? num_data.match(regex1) : null;
    console.log(price);
    if (price === null) {
        price = num_data.match(regex4) !== null ? num_data.match(regex4) : num_data.match(regex3) !== null ? num_data.match(regex3) : null;
        console.log(price);
        if (price !== null) {
            console.log(price);
            price = price.map(number => number.replace(/[,.]/g, ''));
            console.log(price);
            var final_price = parseInt(price.filter(number => {
                var num = parseInt(number);
                if (num >= min && num <= max) {
                    return true; // Include the number in the filtered array
                } else {
                    return false; // Exclude the number from the filtered array
                }
            })[0]);
        } else {
            return NaN;
        }
    } else {
        console.log(price);
        price = price.map(number => number.replace(/[,.]/g, ''));
        console.log(price);
        var final_price = parseInt(price.filter(number => {
            var num = parseInt(number);
            if (num >= min && num <= max) {
                return true; // Include the number in the filtered array
            } else {
                return false; // Exclude the number from the filtered array
            }
        })[0]);
    }
    return final_price;
}
function scraper(name, min, max) {
    var fg = document.getElementsByClassName("_5rgt _5nk5 _5wnf _5msi");
    var sg = document.getElementsByClassName("_5rgt _5nk5 _5msi");
    var tg = document.querySelectorAll("#u_d_c_Y1");
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
    for (i=0; i<tg.length; i++) {
        des.push(tg[i]);
    }
    des.forEach(function (value, index, array) {
        clean = value.textContent.toLocaleLowerCase();
        isMultiple = value.textContent.split("00").length > 3 ? true : false;
        batt = value.textContent.toLocaleLowerCase().includes("mah");
        phone_exist = value.textContent.toLocaleLowerCase().includes(name);
        console.log(value.textContent);
        num_data = clean.split(name)[1];
        console.log(num_data);
        if (clean === "") {
            return ;
        } else if (isMultiple && phone_exist && num_data !== undefined) {
            console.log(clean_price(clean,min,max));
            if ( !isNaN(clean_price(num_data,min,max)) ) {
                price = clean_price(num_data,min,max);
                deals_local.prices.push(price);
                deals_local.links.push(value.querySelectorAll("a")[value.querySelectorAll("a").length - 1]);
                deals_local.date.push(value.previousElementSibling.querySelector("abbr").textContent);
                deals_local.des.push(value.textContent);
                console.log(price);  
            }   
        } else if (clean.match(/\d+/g) !== null) {
            console.log(clean_price(clean,min,max));
            if ( !isNaN(clean_price(clean,min,max)) ) {
                price = clean_price(clean,min,max);
                deals_local.prices.push(price);
                deals_local.links.push(value.querySelectorAll("a")[value.querySelectorAll("a").length - 1]);
                deals_local.date.push(value.previousElementSibling.querySelector("abbr").textContent);
                deals_local.des.push(value.textContent);
                console.log(price); 
            }
        }
    });
    deals = deals_local;
    ndes = des;
    for (i=0; i<deals.prices.length; i++) {
        if (deals.date[i].includes("2023") || deals.date[i].includes("2022") || months[deals.date[i].split(" ")[0]] > 3) {
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
        window.location.href = "https://m.facebook.com/search/posts?q="+ b +"%20دج&filters=eyJyZWNlbnRfcG9zdHM6MCI6IntcIm5hbWVcIjpcInJlY2VudF9wb3N0c1wiLFwiYXJnc1wiOlwiXCJ9In0%3D";
        window.open("https://m.facebook.com/search/posts?q="+ b +"%20da&filters=eyJyZWNlbnRfcG9zdHM6MCI6IntcIm5hbWVcIjpcInJlY2VudF9wb3N0c1wiLFwiYXJnc1wiOlwiXCJ9In0%3D",'_blank');
        window.open("https://m.facebook.com/search/posts?q="+ b +"%2058&filters=eyJyZWNlbnRfcG9zdHM6MCI6IntcIm5hbWVcIjpcInJlY2VudF9wb3N0c1wiLFwiYXJnc1wiOlwiXCJ9In0%3D",'_blank');
    } else if (stat === "old") {
        window.location.href = "https://m.facebook.com/search/posts/?q=" + b + "&source=filter&isTrending=0&tsid=0.21427538263446388";
    } else if (stat === "mine") {
        window.location.href = "https://m.facebook.com/search/posts?q=" + b + "&filters=eyJycF9hdXRob3I6MCI6IntcIm5hbWVcIjpcIm15X2dyb3Vwc19hbmRfcGFnZXNfcG9zdHNcIixcImFyZ3NcIjpcIlwifSJ9";
    }
}