INSERT INTO Users (username, password, data_id)
VALUES (
    $1, -- Username
    $2, -- Password
    $3  -- UserData ID
)
RETURNING id;