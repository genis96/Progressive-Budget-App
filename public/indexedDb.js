const { response } = require("express");

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
        if(getAll.result.length > 0) {
            fetch(`/api/transaction/bulk`, {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: `application/json, text/plain, */*`,
                    "Content-Type": `application/json`
                },
            }).then((response) => response.json())
            .then(() => {
                transaction = db.transaction['pending', 'readwrite'];
                store = transaction.objectStore('pending');
                store.clear();
            });
        }
    };
}

// save records
function saveRecord() {
    const db = request.result;
    const transaction = db.transaction['pending', 'readwrite'];
    const store = transaction.objectStore('pending');
    store.add(record);
}

window.addEventListener('online', checkDatabase);