DO $$
    DECLARE
        COUNTER INTEGER := 14;
        AGE INTEGER := 2;
    
    BEGIN
    WHILE COUNTER < 34 LOOP
        INSERT INTO Users (nickName, firstName, lastName, email, dateBirth, sex, sexpreferences, password, location, position, confirm) VALUES
        (concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER, '@test.ru'), '1965-02-23', 'male', 'heterosexual', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(48.94494123946116,13.309798732421875), true);
        COUNTER := COUNTER + 1;
    END LOOP;

    WHILE COUNTER < 59 LOOP
        INSERT INTO Users (nickName, firstName, lastName, email, dateBirth, sex, sexpreferences, password, location, position) VALUES
        (concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER, '@test.ru'), '1965-02-23', 'male', 'homosexual', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(48.94494123946116,13.309798732421875));
        COUNTER := COUNTER + 1;
    END LOOP;

    WHILE COUNTER < 89 LOOP
        INSERT INTO Users (nickName, firstName, lastName, email, dateBirth, sex, sexpreferences, password, location, position) VALUES
        (concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER, '@test.ru'), '1965-02-23', 'male', 'bisexual', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(48.94494123946116,13.309798732421875));
        COUNTER := COUNTER + 1;
    END LOOP;

     WHILE COUNTER < 110 LOOP
        INSERT INTO Users (nickName, firstName, lastName, email, dateBirth, sex, sexpreferences, password, location, position) VALUES
        (concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER, '@test.ru'), '1965-02-23', 'female', 'heterosexual', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(48.94494123946116,13.309798732421875));
        COUNTER := COUNTER + 1;
    END LOOP;

    WHILE COUNTER < 135 LOOP
        INSERT INTO Users (nickName, firstName, lastName, email, dateBirth, sex, sexpreferences, password, location, position) VALUES
        (concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER, '@test.ru'), '1965-02-23', 'female', 'homosexual', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(48.94494123946116,13.309798732421875));
        COUNTER := COUNTER + 1;
    END LOOP;
    
    WHILE COUNTER < 165 LOOP
        INSERT INTO Users (nickName, firstName, lastName, email, dateBirth, sex, sexpreferences, password, location, position) VALUES
        (concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER), concat('test', COUNTER, '@test.ru'), '1965-02-23', 'female', 'bisexual', '$2b$10$QbsxNU1tXUDH4Q4e13U.tuEfs4PrGEsX8tFwCbqQqXxS8SRpwW1nW' , ARRAY['Russia','Moscow'], point(48.94494123946116,13.309798732421875));
        COUNTER := COUNTER + 1;
    END LOOP;
END$$;