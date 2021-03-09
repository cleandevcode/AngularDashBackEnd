
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('processors').del()
    .then(function () {
      // Inserts seed entries
      return knex('processors').insert([
        {id: 1, name: 'processor 1', email: 'process@hotmail.com'},
        {id: 2, name: 'processor 2', email: 'carrider@gmail.com'},
        {id: 3, name: 'processor 3', email: 'rrcka@live.com'},
        {id: 4, name: 'processor 4', email: 'adb@hotmail.com'},
      ]);
    });
};
