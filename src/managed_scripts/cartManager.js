const productCart = {
    addItem: (itemID)=>{
        let cartContents = productCart.loadCart();
        if (cartContents)
        {
            let contentIndex = cartContents.contents.findIndex(element => element.productID == itemID);
            console.log(cartContents.contents);
            console.log(contentIndex);
            if (contentIndex != -1)
            {
                cartContents.contents[contentIndex].quantity++;
            }
            else
            {
                cartContents.contents.push({
                    productID: itemID,
                    quantity: 1
                });
            }
            productCart.saveCart(cartContents);
        }
    },
    removeItem: (itemID) => {
        let cartContents = productCart.loadCart();
        if (cartContents)
        {
            let contentIndex = cartContents.contents.findIndex(element => element.productID == itemID);
            if (contentIndex != -1)
            {
                if (cartContents.contents[contentIndex].quantity-1 == 0)
                {
                    cartContents.contents.splice(contentIndex, 1);
                }
                else
                {
                    cartContents.contents[contentIndex].quantity--;
                }
            }
            productCart.saveCart(cartContents);
        }
    },
    loadCart: ()=>{
        if (sessionStorage.getItem("_cart") != null)
        {
            return JSON.parse(sessionStorage.getItem("_cart"));
        }
        else
        {
            return false;
        }
    },
    saveCart: (contents)=>{
        sessionStorage.setItem("_cart", JSON.stringify(contents));
    },
    checkOverWriteCart: (venueID)=>{
        let cartContents = productCart.loadCart();
        if (cartContents == false || cartContents.venueID != venueID)
        {
            cartContents = {
                venueID: venueID,
                contents: []
            };
            productCart.saveCart(cartContents);
        }
    }
};

export default productCart;