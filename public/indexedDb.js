let db; 
const request = indexedDB.open(`budget`, 1);

function checkDatabase() {
    // open transaction, access obj store, getAll.onsuccess from store
    const transaction = db.transaction(['pending'], 'readwrite');
    const budgetStore = transaction.objectStore('pending');
    const getAll = budgetStore.getAll();
    
    getAll.onsuccess = function() {

    }
}

window.addEventListener('online', checkDatabase);