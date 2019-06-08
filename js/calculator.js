const distinct = function (value, index, self) {
    return self.indexOf(value) === index;
};
(function (skuProducts) {
    let price = 99999999;
    if (!skuProducts)
        return;
    let products = [];
    skuProducts = JSON.parse(JSON.stringify(skuProducts));
    for (let i = 0; i < skuProducts.length; i++) {
        skuProducts[i].skuAttr = skuProducts[i].skuAttr.replace(/\d+:\d+/g, "").replace(/;/g, '').replace(/^#/, '');
        products.push({
            name: skuProducts[i].skuAttr.split('#'),
            price: skuProducts[i].skuVal.actSkuCalPrice
        });
        price = Math.min(price, skuProducts[i].skuVal.actSkuCalPrice);
    }
    console.log('Original price', price);
    let categoriesNumber = products[0].name.length;

    let container = document.createElement("div");
    container.style.cssText = "position:fixed;left:0px;top:0px;right:0px;overflow-x:scroll;background-color:#ccc;z-index:99999;font-size:20px;";

    let closeButton = document.createElement("span");
    closeButton.style.cssText = "position:fixed;top:0px;right:20px;background-color:#red;z-index:999999;font-size:20px;cursor:pointer;";
    closeButton.innerText = 'X';
    closeButton.addEventListener("click", function () {
        container.style.display = 'none';
        closeButton.style.display = 'none';
    });

    let span = document.createElement("span");
    span.innerText = `Minimum/Original price is: ${price}`;
    container.appendChild(span);

    let t = document.createElement("table");
    t.border = 3;
    container.appendChild(t);

    let tr, td;
    let keys, key1, key2;
    if (categoriesNumber == 0) {
        return;
    }
    else if (categoriesNumber == 1) {
        tr = document.createElement("tr");
        for (let i = 0; i < products.length; i++) {
            td = document.createElement("td");
            td.innerText = products[i].name[0];
            td.style.whiteSpace = 'nowrap';
            tr.appendChild(td);
        }
        t.appendChild(tr);

        tr = document.createElement("tr");
        for (let i = 0; i < products.length; i++) {
            td = document.createElement("td");
            td.innerHTML = products[i].price + `<sub style="color:${(products[i].price - price >= 0) ? 'green' : 'red'};">(${products[i].price - price})</sub>`;
            tr.appendChild(td);
        }
        t.appendChild(tr);
    }
    else if (categoriesNumber == 2) {
        keys = [];
        key1 = [];
        key2 = [];
        for (let i = 0; i < products.length; i++) {
            key1.push(products[i].name[0]);
            key2.push(products[i].name[1]);
            if (!keys[products[i].name[0]]) {
                keys[products[i].name[0]] = [];
            }
            keys[products[i].name[0]][products[i].name[1]] = products[i].price;
        }

        key1 = key1.filter(distinct).sort();
        key2 = key2.filter(distinct).sort();
        keys = keys.sort();

        console.log('keys', keys);
        console.log('key1', key1);
        console.log('key2', key2);

        tr = document.createElement("tr");
        td = document.createElement("td");
        tr.appendChild(td);
        for (let i = 0; i < key1.length; i++) {
            td = document.createElement("td");
            td.innerText = key1[i];
            td.style.whiteSpace = 'nowrap';
            tr.appendChild(td);
        }
        t.appendChild(tr);

        for (let i = 0; i < key2.length; i++) {
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.innerText = key2[i];
            tr.appendChild(td);
            for (let j = 0; j < key1.length; j++) {
                td = document.createElement("td");
                let prevPrice = (i == 0) ? price : keys[key1[j]][key2[i - 1]];
                let currentPrice = keys[key1[j]][key2[i]];
                td.innerHTML = currentPrice + `<sub style="color:${(currentPrice - prevPrice >= 0) ? 'green' : 'red'};">(${currentPrice - prevPrice})</sub>`;
                tr.appendChild(td);
            }
            t.appendChild(tr);
        }
    }
    else {
        return;
    }


    document.body.appendChild(container);
    document.body.appendChild(closeButton);
})((typeof skuProducts !== 'undefined') ? skuProducts : runParams.data.skuModule.skuPriceList);