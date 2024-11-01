// Khai báo biến toàn cục
let orderedItems = [];
let unitPrice = 0;

// Lấy các phần tử DOM
const orderModal = document.getElementById('orderModal');
const successModal = document.getElementById('successModal');
const closeButtons = document.querySelectorAll('.close');
const quantityInput = document.getElementById('quantity');
const totalPrice = document.getElementById('totalPrice');
const confirmOrder = document.getElementById('confirmOrder');
const modalProductName = document.getElementById('modalProductName');
const productCards = document.querySelectorAll('.product-card');
const phoneInput = document.getElementById('phone');
const nameInput = document.getElementById('customerName');
const addressInput = document.getElementById('address');
const emailLink = document.querySelector('.email-link');

// Tạo và thêm phần tử hiển thị đơn hàng
const orderDisplay = document.createElement('div');
orderDisplay.className = 'order-display';
document.body.appendChild(orderDisplay);

// Thiết lập sự kiện khi người dùng nhấn "Đặt Mua"
productCards.forEach((card) => {
    const buyButton = card.querySelector('.buy-button');
    buyButton.onclick = () => {
        const productName = card.querySelector('.product-name').innerText;
        const priceText = card.querySelector('.product-price').innerText.replace(' đ', '').replace('.', '');
        unitPrice = parseInt(priceText, 10);

        modalProductName.innerText = productName;
        document.getElementById('price').innerText = `${unitPrice.toLocaleString('vi-VN')}`;
        updateTotalPrice();
        openOrderModal();
        resetForm();
    };
});

// Các hàm điều khiển modal
function openOrderModal() {
    orderModal.style.display = 'flex';
    setTimeout(() => orderModal.classList.add('show'), 10);
}

function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => (modal.style.display = 'none'), 300);
}

function resetForm() {
    nameInput.value = '';
    phoneInput.value = '';
    addressInput.value = '';
    quantityInput.value = '1';
    document.querySelectorAll('.error-message').forEach((error) => (error.textContent = ''));
}

// Hàm kiểm tra tính hợp lệ của các trường thông tin
function validatePhone(phone) {
    return /^(0[3|5|7|8|9])+([0-9]{8})$/.test(phone);
}

function validateName(name) {
    return name.trim().length >= 2;
}

function validateAddress(address) {
    return address.trim().length >= 10;
}

// Đóng modal khi nhấn nút đóng
closeButtons.forEach((button) => {
    button.onclick = () => closeModal(button.closest('.modal'));
});

window.onclick = (event) => {
    if (event.target === orderModal) closeModal(orderModal);
    if (event.target === successModal) closeModal(successModal);
};

// Cập nhật giá tổng
quantityInput.oninput = updateTotalPrice;

function updateTotalPrice() {
    const quantity = parseInt(quantityInput.value, 10) || 0;
    totalPrice.innerText = `${(quantity * unitPrice).toLocaleString('vi-VN')}`;
}

// Hiển thị lỗi khi nhập sai
phoneInput.addEventListener('input', function () {
    document.getElementById('phoneError').textContent = validatePhone(this.value) ? '' : 'Số điện thoại không hợp lệ';
});

nameInput.addEventListener('input', function () {
    document.getElementById('nameError').textContent = validateName(this.value) ? '' : 'Tên phải có ít nhất 2 ký tự';
});

addressInput.addEventListener('input', function () {
    document.getElementById('addressError').textContent = validateAddress(this.value) ? '' : 'Địa chỉ phải có ít nhất 10 ký tự';
});

// Xử lý đặt hàng
confirmOrder.onclick = () => {
    const name = nameInput.value;
    const phone = phoneInput.value;
    const address = addressInput.value;

    let isValid = true;

    if (!validateName(name)) {
        document.getElementById('nameError').textContent = 'Tên không hợp lệ';
        isValid = false;
    }

    if (!validatePhone(phone)) {
        document.getElementById('phoneError').textContent = 'Số điện thoại không hợp lệ';
        isValid = false;
    }

    if (!validateAddress(address)) {
        document.getElementById('addressError').textContent = 'Địa chỉ không hợp lệ';
        isValid = false;
    }

    if (isValid) {
        const orderItem = {
            productName: modalProductName.innerText,
            quantity: parseInt(quantityInput.value, 10),
            price: totalPrice.innerText,
            date: new Date().toLocaleString(),
        };
        orderedItems.push(orderItem);
        console.log('Đã thêm đơn hàng:', orderItem);

        closeModal(orderModal);
        setTimeout(() => {
            successModal.style.display = 'flex';
            setTimeout(() => successModal.classList.add('show'), 10);
        }, 300);
    }
};

// Hiển thị danh sách đơn hàng khi di chuột vào email
if (emailLink) {
    emailLink.addEventListener('mouseenter', () => {
        if (orderedItems.length === 0) {
            orderDisplay.innerHTML = '<div class="no-orders">Chưa có đơn hàng nào</div>';
        } else {
            orderDisplay.innerHTML = orderedItems
                .map(
                    (item, index) => `
                    <div class="order-item">
                        <div class="order-number">Đơn hàng ${index + 1}</div>
                        <div class="order-name">${item.productName}</div>
                        <div class="order-details">
                            Số lượng: ${item.quantity}<br>
                            Giá: ${item.price}<br>
                            Ngày đặt: ${item.date}
                        </div>
                    </div>`
                )
                .join('');
        }

        const rect = emailLink.getBoundingClientRect();
        orderDisplay.style.display = 'block';
        orderDisplay.style.position = 'absolute';
        orderDisplay.style.top = `${rect.bottom + window.scrollY}px`;
        orderDisplay.style.left = `${rect.left}px`;
    });

    emailLink.addEventListener('mouseleave', (e) => {
        const rect = orderDisplay.getBoundingClientRect();
        const { clientX: mouseX, clientY: mouseY } = e;

        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
            orderDisplay.style.display = 'none';
        }
    });

    orderDisplay.addEventListener('mouseleave', () => {
        orderDisplay.style.display = 'none';
    });
}
