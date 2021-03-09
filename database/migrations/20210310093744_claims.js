
exports.up = function(knex) {
    return knex.schema.createTable("claims", tbl => {
        tbl.increments()
        tbl.integer("client").references('id').inTable('clients');
        tbl.enum("provider", ['Provider 1', 'Provider 2', 'Provider 3']);
        tbl.integer("order");
        tbl.enum("claim_status", ['Success', 'Failed']);
        tbl.integer("processed_by").references('id').inTable('processors');
        tbl.timestamp("date");
        tbl.integer("subtotal");
        tbl.integer("covered");
        tbl.integer("total");

    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("claims");
};