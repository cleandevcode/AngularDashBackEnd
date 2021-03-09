const db = require("../config/dbConfig.js");

// GET ALL claims
const find = async (provider, status, lastName, startDate, endDate) => {

  let query = `select claims.*, clients."firstName" as firstName, clients."lastName" as lastName,  clients.avatar, processors.name as processor_name, processors.email as processor_email 
    from claims left join clients on claims.client = clients.id left join processors on processors.id = claims.processed_by`;
  query += ` where date between '${startDate.toISOString()}' and '${endDate.toISOString(0)}'`;

  if(provider) 
    query += ` and provider = '${provider}'`;
  if(status)
    query += ` and claim_status = '${status}'`;
  if(lastName)
    query += ` and clients."lastName"::text ilike '${lastName}'`
    
  const queryResult = await db.raw(query);
  return queryResult.rows;
};

module.exports = {
  find,
};
