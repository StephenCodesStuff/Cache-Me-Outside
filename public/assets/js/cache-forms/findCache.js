const updateCache = async () => {
    if (event.target.matches('.found-btn')) {
        const response = confirm('Did you really find the cache?');
        cacheID = event.target.getAttribute('data-cache-id');
        if (response) {
            const response = await fetch(`api/cache/${cacheID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                alert('Cache found, updated successfully.');
                document.location.replace('/profile');
            } else {
                alert(response.statusText);
            }
        }
    }
};

    document.querySelector('#found-btn').addEventListener('click', updateCache);