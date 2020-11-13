var dbPromised = idb.open("football", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teamfootball", {
      keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: true });
  });

  function saveForLater(teamsave) {
    var toastHTML_true = '<span>data saved successfully</span>';    
    // var toastHTML_false = '<span>data not saved</span>';    
      dbPromised
        .then(function(db) {
          // if(db <=1){
          var tx = db.transaction("teamfootball", "readwrite");
          var store = tx.objectStore("teamfootball");
          console.log(teamsave);
          store.put(teamsave);
          return tx.complete;
          // }else{
          //   console.log('data tidak bisa di simpan');
          //   M.toast({html: toastHTML_false});    
          // }
        })
        .then(function() {
          M.toast({html: toastHTML_true});    
        })
        .catch((err) => {
        console.error('Team gagal disimpan', err);
      });

  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teamfootball", "readonly");
          var store = tx.objectStore("teamfootball");
          return store.getAll();
        })
        .then(function(infotim) {
          resolve(infotim);
        });
    });
  }


  function deleteinfo(hapusdata){      
    var r = confirm("Are you sure you want to delete?");
    var toastHTML_true = '<span>successfully deleted data</span>';
    if (r == true) {
        dbPromised
        .then(function(db) {
          var tx = db.transaction('teamfootball', 'readwrite');
          var store = tx.objectStore('teamfootball');
          store.delete(hapusdata);
          return tx.complete;
        }).then(function() {
          M.toast({html: toastHTML_true});    
          console.log('Item deleted');
        });

        return true;

      } else {
        return false
      }

   }