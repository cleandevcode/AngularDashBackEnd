
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        {id: 1, firstName: 'Joe', lastName: 'Jonas', avatar: 'a1.svg'},
        {id: 2, firstName: 'Jake', lastName: 'Johnson', avatar: 'a2.svg'},
        {id: 3, firstName: 'Harry', lastName: 'Jake', avatar: 'a3.svg'},
        {id: 4, firstName: 'Michle', lastName: 'Poe', avatar: 'a4.svg'},
      ]);
    });
};
