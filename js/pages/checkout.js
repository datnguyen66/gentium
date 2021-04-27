import {url} from "../config/api.js";

const getEle = (id)=>document.getElementById(id);

getEle('checkoutCart').addEventListener('click', async ()=>{
    let username = getEle('name-user').value;
    let address = getEle('address-user').value;
    if(username.length <= 0 || address.length <= 0)
    {
        alert('Input trong!!!');
        return;
    }
    let data = {
        username: username,
        address: address
    }
    let result = await axios({
        url: `${url}order`,
        method: "post",
        data: data
    }).then(result=>{
        swal("Thành công!", "Cảm ơn bạn!", "success").then(val=>{
            if(val){
                location.href = 'index.html';
            }

        })
        
    })
})