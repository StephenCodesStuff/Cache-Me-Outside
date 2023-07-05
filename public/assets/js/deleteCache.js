const deleteCache = async () => {
    if (event.target.matches('.delete-button')) {
        const response = confirm('Are you sure you want to delete the cache?');
        cacheID = event.target.getAttribute('data-cache-id');
        if (response) {
            const response = await fetch(`api/cache/${cacheID}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                alert('Cache deleted successfully.');
                document.location.replace('/profile');
            } else {
                alert(response.statusText);
            }
        }
    }
};

document.querySelector('#cache-list').addEventListener('click', deleteCache);
