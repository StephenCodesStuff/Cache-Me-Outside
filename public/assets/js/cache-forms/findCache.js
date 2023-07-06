const updateCache = async (cacheId, cache) => {
    const response = await fetch(`/api/cache/${cacheId}`, {
        method: 'PUT',
        body: JSON.stringify(cache),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        alert('Cache found, updated successfully.');
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#btn-found').addEventListener('click', updateCache);