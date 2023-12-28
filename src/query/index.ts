import fs from "fs";

const queryStr = fs.readFileSync("./src/query/query.sql").toString();

const queries = queryStr.split('-- ').map(query => query.trim()).filter(Boolean).map(query => '-- ' + query);

console.log(queries)

export function getQuery(queryName: QueryNames) {
    const query = queries.find(query => query.startsWith('-- ' + queryName + ':'))
    if (!query) throw new Error("Query not found with the name: " + queryName);

    return query;
}

type QueryNames = 'create_user' | 'get_user_list' | 'login_user';