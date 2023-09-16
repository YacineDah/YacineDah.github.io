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

function scraper(name, gen, min) {
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
        var clean = value.textContent.toLocaleLowerCase().replaceAll(".","").replaceAll(",","");
        console.log(value.textContent);
        var check = value.textContent !== "" ? true : false;
        var isMultiple = clean.match(/\d+/g) !== null && check ? clean.match(/\d+/g).filter(e => e.includes("00") && e.length > 4 && e.length < 9 && parseInt(e) >= min).length : 1;
        var date_valid = value.previousElementSibling.querySelector("abbr") !== null ? value.previousElementSibling.querySelector("abbr").textContent : "weird";
        if (isMultiple > 2) {
            for (i=1; i<clean.split(name).length; i++) {
            if (clean.split(name)[i].match(/\d{1}/g) !== null) {
                var gen_post = gen < 10 && clean.split(name)[i].match(/\d{1}/g) !== null ? clean.split(name)[i].match(/\d{1}/g)[0] : clean.split(name)[i].match(/\d{2}/g) !== null ? clean.split(name)[i].match(/\d{2}/g)[0] : 0;
                gen_post = parseInt(gen_post);
                var price_1 = parseInt(clean.split(name)[i].match(/\d+/g).filter(e => e.includes("00") && e.length > 4 && e.length < 9 && parseInt(e) >= min)[0]);
                if (gen_post === gen && clean.split(name)[i].match(/\d+/g).filter(e => e.includes("00") && e.length > 4 && e.length < 9 && parseInt(e) >= min) !== null) {
                    deals_local.prices.push(price_1);
                    deals_local.links.push(value.querySelectorAll("a")[value.querySelectorAll("a").length - 1]);
                    deals_local.date.push(date_valid);
                    deals_local.des.push(value.textContent);
                    console.log(price_1);
                }
            }   
        }
        } else if (clean.split(name).length >= 2 && clean.match(/\d+/g).filter(e => e.includes("00") && e.length > 4 && e.length < 9 && parseInt(e) >= min) !== null) {
            var split_num = clean.split(name)[1].match(/\d+/g) !== null ? 1 : 2;
            var gen_post = clean.split(name)[split_num] !== undefined ? (clean.split(name)[split_num].match(/\d{2}/g) !== null ? (gen < 10 ? clean.split(name)[split_num].match(/\d{1}/g)[0] : clean.split(name)[split_num].match(/\d{2}/g)[0]) : 0) : 0;
            gen_post = parseInt(gen_post);
            var price_2 = parseInt(clean.replaceAll(name,"").match(/\d+/g).filter(e => e.includes("00") && e.length > 4 && e.length < 9 && parseInt(e) >= min)[0]);
            if (gen_post === gen && !isNaN(price_2)) {
                deals_local.prices.push(price_2);
                deals_local.links.push(value.querySelectorAll("a")[value.querySelectorAll("a").length - 1]);
                deals_local.date.push(date_valid);
                deals_local.des.push(value.textContent);
                console.log(price_2);
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
        if(x[i].includes("2022") || months[x[i].split("\n")[1].split(" ")[0]] < 8) {
            continue;
        } else {
            console.log(x[i]);
        }
    }
}
    });
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