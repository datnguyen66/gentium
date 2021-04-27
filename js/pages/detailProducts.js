import {url} from "../config/api.js";

const getEle = (id) =>document.getElementById(id);
const id = localStorage.getItem('id');

if(id){
    axios.get(url+`Clothes/${id}`).then(rs=>{
        getEle('detailProducts').innerHTML = renderDetailProducts(rs.data);
        createButton();
        console.log(rs);
    })
}

let renderDetailProducts = (item) =>{

    let content = '';
    if(item){
        content = `
        <div class="image-content col-6">
                    <img src=${item.imageUrl} alt="">
                </div>
                <div class="text-content col-6">
                    <div class="name-product">
                            <h1>${item.nameProducts}</h1>
                    </div>
                    <div class="price-product">
                        <h1>${item.priceProducts}$</h1>
                    </div>
                    <div class="detail-product-text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quia pariatur minus, commodi praesentium incidunt excepturi fuga ea, officiis nobis. Quam dolorum cumque quis deserunt repellat perspiciatis quos odit, sapiente.
                        </p>
                    </div>
                    <div class="cart">
                        <div class="quantity">
                            <input type="number"  value="1" step="1" min="1" size="4" class="button-quantity">
                        </div>
                        <div class="addtocart">
                            <button type="submit" class="button-addtocart" onclick="addToCart('${item.id}')">ADD TO CART</button>
                        </div>
                    </div>
                    <div class="share">
                        <div class="iconshare">
                            <i class="icon fa fa-share-alt"></i> Share :
                        </div>
                        <div class="iconss">
                            <a href="#" id="facebook-btn"> <i class="fab fa-facebook-square"></i> </a>
                            <i class="fab fa-twitter-square"></i>
                            <i class="fab fa-google-plus-square"></i>
                            <i class="fab fa-tumblr-square"></i>
                            <i class="fab fa-pinterest-square"></i>
                        </div>
                    </div>
                    
                </div>
        `
    }
    return content;
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



// addtocart

let renderCart = (arr)=>{
    
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
window.addToCart = (id)=>{
    axios.get(url+`Clothes/${id}`).then(rs=>{
        cart.push(rs.data)
        getEle('cartContent').innerHTML = renderCart(cart);
    })
}
window.deleteProducts = (id)=>{
    let cart2 = JSON.parse(localStorage.getItem('cart'));

    let newCart =cart2.filter((item)=>item.id != id)
    
    localStorage.setItem('cart', JSON.stringify(newCart));

    cart = newCart;

    getEle('cartContent').innerHTML = renderCart(cart);
    
}

/*
social link Facebook

whatapps: 
https://api.whatsapp.com/send?text=[post-title] [post-url]

Facebook : 
https://www.facebook.com/sharer.php?u=[post-url]

 */

const createButton = function()
{
    let facebookbtn = document.getElementById("facebook-btn");
        let postUrl = encodeURI(document.location.href);
        let postTitle = encodeURI('check this out');
        facebookbtn.setAttribute('href',`https://www.facebook.com/sharer.php?u=${postUrl}`)
}
