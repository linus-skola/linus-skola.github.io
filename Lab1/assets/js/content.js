window.addEventListener('load', () => {
    var cartcount = 0;

    cartcount = sessionStorage.getItem('cart');

    var cart = document.getElementById('cartcount');
    cart.textContent = cartcount;

    var adds = document.getElementsByName('add');

    $(adds).on("click", function () {
        cartcount++;
        var cart = document.getElementById('cartcount');
        cart.textContent = cartcount;

        sessionStorage.setItem('cart', cartcount);
    });

    $('#cart').on("click", function () {
        cartcount = 0;
        var cart = document.getElementById('cartcount');
        cart.textContent = cartcount;

        sessionStorage.setItem('cart', cartcount);
    });
});



