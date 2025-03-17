// বাসা যোগ করা ফাংশন
function addHouse() {
    const name = document.getElementById('house-name').value;
    const location = document.getElementById('house-location').value;
    const description = document.getElementById('house-description').value;

    if (name && location && description) {
        const houseList = document.getElementById('houses');
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${name}</strong><br>ঠিকানা: ${location}<br>বিবরণ: ${description}`;
        houseList.appendChild(listItem);

        // ফর্ম রিসেট
        document.getElementById('house-name').value = '';
        document.getElementById('house-location').value = '';
        document.getElementById('house-description').value = '';
    } else {
        alert('সব ঘর পূরণ করুন!');
    }
}

// বাসা খোঁজার ফাংশন
function searchHouse() {
    const searchLocation = document.getElementById('location').value.toLowerCase();
    const houses = document.querySelectorAll('#houses li');

    let found = false;
    houses.forEach(house => {
        if (house.innerHTML.toLowerCase().includes(searchLocation)) {
            house.style.display = 'block';
            found = true;
        } else {
            house.style.display = 'none';
        }
    });

    if (!found) {
        alert('এই লোকেশনে কোনো বাসা পাওয়া যায়নি!');
    }
}