document.addEventListener('DOMContentLoaded', function() {

    const propertyTypeSelect = document.getElementById('property-type');
    const minBedsInput = document.getElementById('min-beds');
    const maxPriceInput = document.getElementById('max-price');
    const sortBySelect = document.getElementById('sort-by');

    const propertyListContainer = document.getElementById('property-list');

    let propertyItems = Array.from(propertyListContainer.querySelectorAll('.property-item'));

    function updatePropertiesDisplay() {
        const selectedType = propertyTypeSelect.value;
        const minBeds = parseInt(minBedsInput.value) || 0;
        const maxPrice = parseInt(maxPriceInput.value) || Infinity;
        const sortBy = sortBySelect.value;

        const filteredProperties = propertyItems.filter(item => {
            const itemType = item.getAttribute('data-type');
            const itemBeds = parseInt(item.getAttribute('data-beds'));
            const itemPrice = parseInt(item.getAttribute('data-price'));

            const typeMatch = selectedType === 'all' || itemType === selectedType;

            const bedsMatch = itemBeds >= minBeds;

            const priceMatch = maxPrice === Infinity || itemPrice <= maxPrice;

            return typeMatch && bedsMatch && priceMatch;
        });

        filteredProperties.sort((a, b) => {
            const aPrice = parseInt(a.getAttribute('data-price'));
            const bPrice = parseInt(b.getAttribute('data-price'));
            const aBeds = parseInt(a.getAttribute('data-beds'));
            const bBeds = parseInt(b.getAttribute('data-beds'));

            if (sortBy === 'price-asc') {
                return aPrice - bPrice;
            } else if (sortBy === 'price-desc') {
                return bPrice - aPrice;
            } else if (sortBy === 'beds-asc') {
                return aBeds - bBeds;
            } else if (sortBy === 'beds-desc') {
                return bBeds - aBeds;
            }
            return 0;
        });

        propertyListContainer.innerHTML = '';

        if (filteredProperties.length > 0) {
             filteredProperties.forEach(item => {
                 propertyListContainer.appendChild(item);
             });
        } else {
            propertyListContainer.innerHTML = '<p style="text-align: center; width: 100%;">No properties found matching your criteria.</p>';
        }
    }

    propertyTypeSelect.addEventListener('change', updatePropertiesDisplay);
    minBedsInput.addEventListener('input', updatePropertiesDisplay);
    maxPriceInput.addEventListener('input', updatePropertiesDisplay);
    sortBySelect.addEventListener('change', updatePropertiesDisplay);

    updatePropertiesDisplay();
});
