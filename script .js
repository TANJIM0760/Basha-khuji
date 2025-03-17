// লোকেশন নেওয়ার ফাংশন
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById('house-location').value = `Lat: ${latitude}, Lng: ${longitude}`;
        }, () => {
            alert('📍 লোকেশন অ্যাক্সেস ব্যর্থ হয়েছে!');
        });
    } else {
        alert("আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।");
    }
}

// বাসা যোগ করা ফাংশন
function addHouse() {
    const name = document.getElementById('house-name').value.trim();
    const location = document.getElementById('house-location').value.trim();
    const description = document.getElementById('house-description').value.trim();
    const imageFile = document.getElementById('house-image').files[0];
    const message = document.getElementById('message');
    
    if (name && location && description && imageFile) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const houses = JSON.parse(localStorage.getItem('houses')) || [];
            const house = {
                name: name,
                location: location,
                description: description,
                image: e.target.result // Image data as base64
            };
            
            houses.push(house);
            localStorage.setItem('houses', JSON.stringify(houses));
            loadHouses();  // Reload the houses after adding a new one
            
            // Clear the form inputs
            document.getElementById('house-name').value = '';
            document.getElementById('house-location').value = '';
            document.getElementById('house-description').value = '';
            document.getElementById('house-image').value = '';
            
            message.style.color = 'green';
            message.innerText = '✅ বাসাটি সফলভাবে যোগ করা হয়েছে!';
        };
        
        reader.readAsDataURL(imageFile); // Read the image file and get its base64 encoding
    } else {
        message.style.color = 'red';
        message.innerText = '⚠️ অনুগ্রহ করে সব ঘর পূরণ করুন!';
    }

    setTimeout(() => message.innerText = '', 3000);
}

// বাসা খোঁজার ফাংশন
function searchHouse() {
    const searchLocation = document.getElementById('location').value.trim().toLowerCase();
    const houses = document.querySelectorAll('#houses li');
    const message = document.getElementById('message');
    
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
        message.style.color = 'red';
        message.innerText = '❌ এই লোকেশনে কোনো বাসা পাওয়া যায়নি!';
    } else {
        message.style.color = 'green';
        message.innerText = '✅ বাসা খুঁজে পাওয়া গেছে!';
    }
    
    setTimeout(() => message.innerText = '', 3000);
}

// বাসা লোড করা ফাংশন
function loadHouses() {
    const houses = JSON.parse(localStorage.getItem('houses')) || [];
    const houseList = document.getElementById('houses');
    houseList.innerHTML = '';
    
    houses.forEach(house => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${house.name}</strong><br>📍 লোকেশন: ${house.location}<br>📝 বিবরণ: ${house.description}<br>
            <img src="${house.image}" alt="House Image" width="100%"><br>
        `;
        houseList.appendChild(listItem);
    });
}

// পেজ লোড হলে পুরনো ডেটা লোড করবে
window.onload = loadHouses;

// ডার্ক থিম টগল ফাংশন
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
                }
