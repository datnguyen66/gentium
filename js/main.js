import {url} from "./config/api.js";
const getEle = (id)=>document.getElementById(id);


window.onload = ()=>{
    axios.get(url+'Clothes').then(rs=>{
        getEle('productsContent').innerHTML = renderClothes(rs.data)
    });
}

const renderClothes = (arr) =>{
    if(arr){
        let content = "";
        arr.forEach(item=>{
            content +=`
            <div class="col-3">
                <img src=${item.imageUrl} alt="">
                <div class="content-product">
                    <div class="name-products">
                        <p>
                            <a href="#" onclick="detail('${item.id}')">${item.nameProducts}</a>
                        </p>
                    </div>
                    <div class="price">
                        <p class="font-monospace">${item.priceProducts}$</p>
                        <div class="icon-cart rounded-circle">
                            <i class="fa fa-shopping-cart" style="cursor:pointer;" onclick="buy('${item.id}')"></i>
                        </div>
                    </div>
                </div>
            </div>
            `;
        })
        return content;
    }
}

//open modal cart
document.querySelector("#cart-logo").addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelectorAll(".modal-cart")[0].style = "transform: translateX(-50%) translateY(0)";
});


document.querySelector("#close-modal").addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelectorAll(".modal-cart")[0].style = "transform: translateX(-50%) translateY(-200%);";
});

// CART
let cart =[];
window.buy = (id)=>{
    axios.get(url+`Clothes/${id}`).then(rs=>{
        let data = rs.data;
        localStorage.setItem('cart',JSON.stringify(cart));
        console.log(data);
        if(!cart)
        {
            getEle('cartContent').innerHTML = ""
        }
        // Check for duplication
        let item = cart.find((e) => e.data.id == id);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ data, quantity: 1 });
        }
        showCart();
    })
}

const showCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    getEle('cartContent').innerHTML = renderCart(cart);
}

const renderCart = (arr)=>{
    
    if(arr.length){
        let content = "";
        let total = 0
        arr.forEach(item=>{
            total += (item.data.priceProducts * item.quantity)
            total = total.toLocaleString('en-US', {style : 'currency', currency : 'USD'});

            content+=`
            <tr>
            <th scope="row">${item.data.id}</th>
            <td>${item.data.nameProducts}</td>
            <td><img src=${item.data.imageUrl} /></td>
            <td>${item.data.priceProducts}</td>
            <td><input type="number" value="${item.quantity}" min="1" class="quanTity" style="width: 60px;" /></td>
            <td>${total}</td>
            
            <td><button class="btn btn-danger" onclick="deleteProducts('${item.data.id}')" >Delete</button></td>
          </tr>
            `;
        })
        return content;
        
    }
}

// detail product

window.detail = function(id) {
    location.href = "../pages/detailproducts.html";
    localStorage.setItem('id', id)
}



window.deleteProducts = (id)=>{
    let cart2 = JSON.parse(localStorage.getItem('cart'));

    let newCart =cart2.filter((item)=>item.data.id != id)
    
    localStorage.setItem('cart', JSON.stringify(newCart));

    cart = newCart;

    getEle('cartContent').innerHTML = renderCart(cart);
    
}


showCart();

document.querySelector("#close-modal").addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelectorAll(".modal-cart")[0].style = "transform: translateX(-50%) translateY(-200%);";
});