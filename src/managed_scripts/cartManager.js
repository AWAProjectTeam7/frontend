const productCart = {
    addItem: (itemID)=>{
        let cartContents = productCart.loadCart();
        if (cartContents)
        {
            let contentIndex = cartContents.orderContents.findIndex(element => element.productID == itemID);
            if (contentIndex != -1)
            {
                cartContents.orderContents[contentIndex].quantity++;
            }
            else
            {
                cartContents.orderContents.push({
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
            let contentIndex = cartContents.orderContents.findIndex(element => element.productID == itemID);
            if (contentIndex != -1)
            {
                if (cartContents.orderContents[contentIndex].quantity-1 == 0)
                {
                    cartContents.orderContents.splice(contentIndex, 1);
                }
                else
                {
                    cartContents.orderContents[contentIndex].quantity--;
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
                venueID: Number.parseInt(venueID),
                orderContents: []
            };
            productCart.saveCart(cartContents);
        }
    }
};

export default productCart;