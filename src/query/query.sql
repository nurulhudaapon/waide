-- create_user:
INSERT INTO user (email, password) VALUES (?, ?);
INSERT INTO user_profile (first_name, last_name, user_id) VALUES (?, ?, LAST_INSERT_ID());

-- login_user:
SELECT * FROM user WHERE email = ?;

-- get_user_list:
SELECT
    u.id,
    u.username,
    u.email,
    u.created_at,
    u.updated_at,
    up.first_name,
    up.last_name,
    c.algorithm,
    c.variation,
    c.code,
    cp.time,
    cp.memory
FROM user u
LEFT JOIN user_profile up ON u.id = up.user_id
LEFT JOIN code c ON u.id = c.user_id
LEFT JOIN code_performance cp ON c.id = cp.code_id