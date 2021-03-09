exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('claims').del()
    .then(function () {
      // Inserts seed entries
      return knex('claims').insert([
        {
          id: 1,
          client: 1,
          provider: 'Provider 1',
          order: 7,
          claim_status: 'Success',
          date: new Date('2021-01-20 07:04:17'),
          processed_by: 1,
          subtotal: 100,
          covered: 18,
          total: 118
        },
        {
          id: 2,
          client: 2,
          provider: 'Provider 2',
          order: 7,
          claim_status: 'Success',
          date: new Date('2021-01-21 07:04:17'),
          processed_by: 2,
          subtotal: 100,
          covered: 18,
          total: 118
        },
        {
          id: 3,
          client: 3,
          provider: 'Provider 1',
          order: 7,
          claim_status: 'Failed',
          date: new Date('2021-01-22 07:04:17'),
          processed_by: 3,
          subtotal: 100,
          covered: 18,
          total: 118
        },
        {
          id: 4,
          client: 4,
          provider: 'Provider 3',
          order: 7,
          claim_status: 'Failed',
          date: new Date('2021-01-22 17:04:17'),
          processed_by: 4,
          subtotal: 100,
          covered: 18,
          total: 118
        },
        {
          id: 5,
          client: 1,
          provider: 'Provider 1',
          order: 7,
          claim_status: 'Failed',
          date: new Date('2021-01-21 17:04:17'),
          processed_by: 2,
          subtotal: 100,
          covered: 18,
          total: 118
        },
        {
          id: 6,
          client: 2,
          provider: 'Provider 2',
          order: 7,
          claim_status: 'Success',
          date: new Date('2021-01-21 11:04:17'),
          processed_by: 3,
          subtotal: 100,
          covered: 18,
          total: 118
        },
        {
          id: 7,
          client: 3,
          provider: 'Provider 1',
          order: 7,
          claim_status: 'Success',
          date: new Date('2021-01-22 01:04:17'),
          processed_by: 4,
          subtotal: 100,
          covered: 18,
          total: 118
        },
        {
          id: 8,
          client: 4,
          provider: 'Provider 3',
          order: 7,
          claim_status: 'Failed',
          date: new Date('2021-01-20 17:04:17'),
          processed_by:1,
          subtotal: 100,
          covered: 18,
          total: 118
        },
        {
          id: 9,
          client: 1,
          provider: 'Provider 3',
          order: 7,
          claim_status: 'Failed',
          date: new Date('2021-01-22 05:04:17'),
          processed_by: 4,
          subtotal: 100,
          covered: 18,
          total: 118
        },
      ]);
    });
};