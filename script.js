// Subscribe alert for all pages
function setupSubscribeAlert() {
    const footer = document.querySelector('footer');
    if (footer) {
        const subscribeBtn = document.createElement('button');
        subscribeBtn.textContent = 'Subscribe';
        subscribeBtn.style.marginLeft = '20px';
        subscribeBtn.style.padding = '6px 12px';
        subscribeBtn.style.borderRadius = '4px';
        subscribeBtn.style.border = 'none';
        subscribeBtn.style.backgroundColor = '#634E99';
        subscribeBtn.style.color = '#fff';
        subscribeBtn.style.cursor = 'pointer';

        subscribeBtn.addEventListener('click', () => {
            alert('Thank you for subscribing.');
        });

        footer.appendChild(subscribeBtn);
    }
}

// Add to Cart functionality (Gallery Page)
function setupGalleryAlerts() {
    if (window.location.href.includes('gallery.html')) {
        const container = document.querySelector('.container');
        const planBoxes = document.querySelectorAll('.plan-box');
        let cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];

        const cartWrapper = document.createElement('div');
        cartWrapper.style.position = 'fixed';
        cartWrapper.style.top = '10px';
        cartWrapper.style.right = '15px';
        cartWrapper.style.fontSize = '24px';
        cartWrapper.style.cursor = 'pointer';
        cartWrapper.style.zIndex = '999';

        const cartIcon = document.createElement('div');
        cartIcon.innerHTML = `<span style="filter: brightness(1000%)">🛒</span>`;
        cartIcon.title = 'Cart';

        const dropdown = document.createElement('div');
        dropdown.style.display = 'none';
        dropdown.style.position = 'absolute';
        dropdown.style.top = '30px';
        dropdown.style.right = '0';
        dropdown.style.backgroundColor = '#fff';
        dropdown.style.border = '1px solid #634E99';
        dropdown.style.borderRadius = '4px';
        dropdown.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        dropdown.style.minWidth = '100px';

        const viewCart = document.createElement('div');
        viewCart.textContent = 'View Cart';
        viewCart.style.padding = '6px 10px';
        viewCart.style.fontSize = '12px';
        viewCart.style.cursor = 'pointer';
        viewCart.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Cart is empty');
            } else {
                alert('Items in cart:\n' + cart.join('\n'));
            }
            dropdown.style.display = 'none';
        });

        const clearCart = document.createElement('div');
        clearCart.textContent = 'Clear Cart';
        clearCart.style.padding = '6px 10px';
        clearCart.style.fontSize = '12px';
        clearCart.style.cursor = 'pointer';
        clearCart.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('No items to clear.');
            } else {
                cart = [];
                sessionStorage.removeItem('cartItems');
                alert('Cart cleared');
            }
            dropdown.style.display = 'none';
        });

        const processOrder = document.createElement('div');
        processOrder.textContent = 'Process Order';
        processOrder.style.padding = '6px 10px';
        processOrder.style.fontSize = '12px';
        processOrder.style.cursor = 'pointer';
        processOrder.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Cart is empty');
            } else {
                alert('Congrats! You have registered for:\n' + cart.join('\n') + '\n\nPlease visit your nearest ABC Fitness Zone to complete the registration process.');
                cart = [];
                sessionStorage.removeItem('cartItems');
            }
            dropdown.style.display = 'none';
        });

        [viewCart, clearCart, processOrder].forEach(item => {
            item.addEventListener('mouseover', () => item.style.backgroundColor = '#f0f0f0');
            item.addEventListener('mouseout', () => item.style.backgroundColor = '#fff');
            dropdown.appendChild(item);
        });

        cartWrapper.appendChild(cartIcon);
        cartWrapper.appendChild(dropdown);
        document.body.appendChild(cartWrapper);

        cartIcon.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });

        window.addEventListener('click', (event) => {
            if (!cartWrapper.contains(event.target)) {
                dropdown.style.display = 'none';
            }
        });

        planBoxes.forEach((box) => {
            const iconWrapper = document.createElement('div');
            iconWrapper.style.marginTop = '10px';
            iconWrapper.style.opacity = '0';
            iconWrapper.style.transition = 'opacity 0.3s';

            const icon = document.createElement('div');
            icon.innerHTML = '🛒';
            icon.style.fontSize = '20px';
            icon.style.cursor = 'pointer';

            const label = document.createElement('div');
            label.textContent = 'Add to Cart';
            label.style.fontSize = '14px';

            iconWrapper.appendChild(icon);
            iconWrapper.appendChild(label);
            box.appendChild(iconWrapper);

            box.addEventListener('mouseenter', () => {
                iconWrapper.style.opacity = '1';
            });

            box.addEventListener('mouseleave', () => {
                iconWrapper.style.opacity = '0';
            });

            icon.addEventListener('click', () => {
                const item = box.querySelector('h3').textContent;
                cart.push(item);
                sessionStorage.setItem('cartItems', JSON.stringify(cart));
                alert('Item added to the cart');
            });
        });
    }
}

// About/Contact form alert
function setupContactAlert() {
    if (window.location.href.includes('contact.html')) {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('name')?.value || '';
                const email = document.getElementById('email')?.value || '';
                const phone = document.getElementById('phone')?.value || '';
                const feedback = document.getElementById('feedback')?.value || '';
                const customOrder = document.getElementById('custom-order')?.checked || false;

                const customerInfo = {
                    name,
                    email,
                    phone,
                    feedback,
                    customOrder
                };

                localStorage.setItem(name, JSON.stringify(customerInfo));
                alert(`Thank you for your message, ${name}!`);
                form.reset();
            });
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setupSubscribeAlert();
    setupGalleryAlerts();
    setupContactAlert();
});
