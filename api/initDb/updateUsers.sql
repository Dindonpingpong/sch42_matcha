UPDATE Users SET position = point(55.751244, 37.618423) WHERE id > 0 AND id <= 100;
UPDATE Users SET position = point(55.822887575908794, 37.73254394531251 ) WHERE id > 100 AND id <= 200;
UPDATE Users SET position = point(55.61093541443636, 37.59521484375001) WHERE id > 200 AND id <= 300;
UPDATE Users SET position = point(55.77966236981707, 37.44964599609376) WHERE id > 300 AND id <= 400;
UPDATE Users SET position = point(55.42277902267131, 37.53753662109376), location[1] = 'Russia', location[2] = 'Podolsk' WHERE id > 400 AND id <= 500;
UPDATE Users SET position = point(56.83094409085875, 35.90332031250001), location[1] = 'Russia', location[2] = 'Tver' WHERE id > 500 AND id <= 600;
UPDATE Users SET position = point(54.62297813269033, 39.74853515625001), location[1] = 'Russia', location[2] = 'Ryazan' WHERE id > 700 AND id <= 800;
UPDATE Users SET position = point(51.66574141105715, 39.15527343750001), location[1] = 'Russia', location[2] = 'Voronezh' WHERE id > 800 AND id <= 900;
UPDATE Users SET position = point(59.915106669245674, 30.382690429687504), location[1] = 'Russia', location[2] = 'Podolsk' WHERE id > 900 AND id <= 1000;

DO $$
    DECLARE
        COUNTER INTEGER := 6;
        LARGECOUNTER INTEGER = 50;
        AGE INTEGER := 2;
    
    BEGIN

    WHILE COUNTER < 50 LOOP
        INSERT INTO User_Tags (idUser, idTag) SELECT COUNTER, 1;
        COUNTER := COUNTER + 1;
    END LOOP;

    WHILE COUNTER < 100 LOOP
        INSERT INTO User_Tags (idUser, idTag) SELECT COUNTER, 2;
        COUNTER := COUNTER + 1;
    END LOOP;

    WHILE COUNTER < 150 LOOP
        INSERT INTO User_Tags (idUser, idTag) SELECT COUNTER, 3;
        COUNTER := COUNTER + 1;
    END LOOP;

    WHILE COUNTER < 200 LOOP
        INSERT INTO User_Tags (idUser, idTag) SELECT COUNTER, 4;
        COUNTER := COUNTER + 1;
    END LOOP;

    WHILE COUNTER < 250 LOOP
        INSERT INTO User_Tags (idUser, idTag) SELECT COUNTER, 5;
        COUNTER := COUNTER + 1;
    END LOOP;

    WHILE COUNTER < 300 LOOP
        INSERT INTO User_Tags (idUser, idTag) SELECT COUNTER, 6;
        COUNTER := COUNTER + 1;
    END LOOP;

    WHILE LARGECOUNTER < 1000 LOOP
      WHILE COUNTER < LARGECOUNTER LOOP
        INSERT INTO User_Tags (idUser, idTag) SELECT COUNTER, unnest(array[1, 2]);
        COUNTER := COUNTER + 1;
      END LOOP;
      LARGECOUNTER := LARGECOUNTER + 100;
    END LOOP;

END$$;