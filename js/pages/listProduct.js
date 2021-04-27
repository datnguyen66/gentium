import {url} from "../config/api.js";
const getEle = (id) => document.getElementById(id);


window.onload = () =>{
    axios.get(url+'Clothes').then(rs=>{
        getEle('listProductContent').innerHTML = renderListProducts(rs.data)
    });
}

let renderListProducts = (arr)=>{
    if(arr){
        let content = "";
        arr.forEach(item=>{
            content +=`
            <div class="col-3">
                <img src=${item.imageUrl} alt="">
                <div class="content-product">
                    <div class="name-products">
                        <p>
                            <a href="./detailproducts.html">${item.nameProducts}</a>
                        </p>
                    </div>
                    <div class="price">
                        <p class="font-monospace">${item.priceProducts}$</p>
                        <div class="icon-cart rounded-circle">
                            <i class="fa fa-shopping-cart" onclick="buy('${item.id}')"></i>
                        </div>
                    </div>
                </div>
            </div>
            `;
        })
        return content;
    }
}


// open modal cart 
document.querySelector("#cart-logo").addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelectorAll(".modal-cart")[0].style = "transform: translateX(-50%) translateY(0)";
});


document.querySelector("#close-modal").addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelectorAll(".modal-cart")[0].style = "transform: translateX(-50%) translateY(-200%);";
});



const renderCart = (arr)=>{
    
    if(arr.length){
        let content = "";
        arr.forEach(item=>{
            content+=`
            <tr>
            <th scope="row">${item.id}</th>
            <td>${item.nameProducts}</td>
            <td><img src=${item.imageUrl} /></td>
            <td>${item.priceProducts}</td>
            <td><input type="number" value="1" min="1" id="qua  nTiTy" /></td>
            <td> ${item.priceProducts}</td>
            
            <td><button class="btn btn-danger" onclick="deleteProducts('${item.id}')">Delete</button></td>
          </tr>
            `;
        })
        return content;
    }
}   

let cart = JSON.parse(localStorage.getItem('cart'));
getEle('cartContent').innerHTML = renderCart(cart);
console.log(cart);
window.buy = (id)=>{
    axios.get(url+`Clothes/${id}`).then(rs=>{
        cart.push(rs.data)
        getEle('cartContent').innerHTML = renderCart(cart);
    })
}



// delete products cart 
window.deleteProducts = (id)=>{
    let cart2 = JSON.parse(localStorage.getItem('cart'));

    let newCart =cart2.filter((item)=>item.id != id)
    
    localStorage.setItem('cart', JSON.stringify(newCart));

    cart = newCart;

    getEle('cartContent').innerHTML = renderCart(cart);
    
}