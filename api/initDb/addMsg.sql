DO $$
    DECLARE
        COUNTER INTEGER := 1;
    
    BEGIN
    WHILE COUNTER < 77 LOOP
        INSERT INTO Chat (idFrom, idTo, message, type) VALUES (1,2,'hello', 'message');
        COUNTER := COUNTER + 1;
    END LOOP;
END$$;