const request = indexedDB.open(`budget`, 1);

request.onupgradeneeded = event => {
    const db = request.result;
    db.createObjectStore('pending', { autoIncrement:  true });
    console.log(event);
}

request.onsuccess = event => {
    if(navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = event => console.error(event);

function checkDatabase() {
    // open transaction, access obj store, getAll.onsuccess from store
    const transaction = db.transaction(['pending'], 'readwrite');
    const store = transaction.objectStore('pending');
    const getAll = store.getAll();

    getAll.onsuccess = function() {

    }
}

window.addEventListener('online', checkDatabase);