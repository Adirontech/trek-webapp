INSERT INTO UserData (first_name, last_name, address, city, state, zip, phone)
VALUES (
    $1, -- First Name
    $2, -- Last Name
    $3, -- Address
    $4, -- City
    $5, -- State
    $6, -- Zip
    $7  -- Phone
)
RETURNING id;