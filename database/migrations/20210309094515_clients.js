exports.up = function(knex) {
    return knex.schema.createTable("clients", tbl => {
        tbl.increments()
        tbl.string("firstName")
        tbl.string("lastName")
        tbl.string('avatar')

    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("clients");
  
};
