INSERT INTO department (name) 
VALUES ("Corporate"),
       ("Bed"),
       ("Bath"),
       ("Beyond"),
       ("Food Court");

INSERT INTO role (title, salary, department_id) 
VALUES ("CEO", 600000, 1),
       ("manager", 100000, 2),
       ("manager", 100000, 3),
       ("manager", 100000, 4),
       ("manager", 100000, 5),
       ("assistant manager", 80000, 2),
       ("assistant manager", 80000, 3),
       ("assistant manager", 80000, 4),
       ("assistant manager", 80000, 5),
       ("team lead", 60000, 2),
       ("team lead", 50000, 2),
       ("team lead", 60000, 3),
       ("team lead", 50000, 3),
       ("team lead", 60000, 4),
       ("team lead", 50000, 4),
       ("team lead", 60000, 5),
       ("team lead", 50000, 5),
       ("associate", 40000, 2),
       ("associate", 40000, 3),
       ("associate", 40000, 4),
       ("associate", 40000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Quando T.", "Unfathomable", 1, NULL);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("Caroline", "Bobaroline", 1, 2),
       ("Carolina", "Fofaroline", 1, 3),
       ("Carlynne", "Dodaroline", 1, 4),
       ("Carol", "Momaroline", 1, 5);
       
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ("George", "Bettel", 2, 6),
("Paul", "Bottle", 3, 7),
("Ringo", "Buttle", 4, 8),
("John", "Battle", 5, 9);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES("Tom", "Roberts", 6, 10),
("Tim", "Richards", 6, 11),
("Thom", "Randals", 7, 12),
("Tham", "Rangos", 7, 13),
("Thor", "Ragnaroks", 8, 14),
("Ted", "Randingos", 8, 15),
("Timothy", "Bimothys", 9, 16),
("Toonces", "Drivynkats", 9, 17);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES("Ava", "Smith", 10, 18),
("Eva", "Smyth", 10, 18),
("Iva", "Smythe", 10, 18),
("Liva", "Smyt", 10, 18),
("Miva", "Smyths", 11, 19),
("Niva", "Smythy", 11, 19),
("Oiva", "Smythie", 11, 19),
("Piva", "Johnson", 11, 19),
("Qiva", "Johnstun", 12, 20),
("Riva", "Johnstan", 12, 20),
("Siva", "Johnstoy", 12, 20),
("Tiva", "Johnstow", 12, 20),
("Uiva", "Johnstoe", 13, 21),
("Viva", "Lozvegus", 13, 21),
("Wiva", "Johns", 13, 21),
("Xiva", "Jaspers", 13, 21);