-- Create tables

CREATE TABLE IF NOT EXISTS "user" (
  sid     Integer   PRIMARY KEY,
  "phone#"  TEXT      NOT NULL,
  name    TEXT      NOT NULL,
  gender  CHAR(1)   NOT NULL,
  email   TEXT,
  UNIQUE ("phone#")
);

CREATE TABLE IF NOT EXISTS Subletter (
  subID   Serial, 
  sid     Integer,
  PRIMARY KEY (sid),
  UNIQUE (sid, subID),
  FOREIGN KEY (sid) REFERENCES "user" (sid)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Applicant (  
  applicantID   Serial,
  sid           Integer,
  PRIMARY KEY (sid),
  UNIQUE (sid, applicantID),
  FOREIGN KEY (sid) REFERENCES "user" (sid)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Supporting_Document4 (
  document    TEXT    PRIMARY KEY,
  type        TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS Supporting_Document123 (
  documentID    Serial    PRIMARY KEY,
  applicantID   Serial    NOT NULL,
  sid           Serial    NOT NULL,
  document      TEXT      NOT NULL,
  FOREIGN KEY (applicantID, sid) REFERENCES Applicant (applicantID, sid)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (document) REFERENCES Supporting_Document4 (document)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Residence (
  resID         Serial    PRIMARY KEY,
  buildingName  TEXT      NOT NULL,
  streetAddress TEXT      NOT NULL,
  minAge        Integer,
  UNIQUE (buildingName, streetAddress)
);

CREATE TABLE IF NOT EXISTS Room_In5 (
  numRooms      Integer   PRIMARY KEY,
  numBathrooms  Integer
);

CREATE TABLE IF NOT EXISTS Room_In34 (
  roomType    TEXT      PRIMARY KEY,
  hasKitchen  Boolean   NOT NULL,
  numRooms    Integer   NOT NULL,
  FOREIGN KEY (numRooms) REFERENCES Room_In5(numRooms)
);

CREATE TABLE IF NOT EXISTS Room_In12 (
  "room#"     Integer,
  resID     Serial,
  roomType  CHAR(1)   NOT NULL,
  gender    CHAR(1)   NOT NULL,
  PRIMARY KEY ("room#", resID),
  FOREIGN KEY (resID) REFERENCES Residence (resID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (roomType) REFERENCES Room_in34 (roomType)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Amenity (
  type    TEXT      PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS has (
  amenityType   TEXT,
  resID         Serial,
  PRIMARY KEY (amenityType, resID),
  FOREIGN KEY (amenityType) REFERENCES Amenity (type),
  FOREIGN KEY (resID) REFERENCES Residence (resID)
);

CREATE TABLE IF NOT EXISTS Listing (
  listingID   Serial    PRIMARY KEY,
  "room#"       Integer   NOT NULL,
  resID       Serial    NOT NULL,
  subID       Serial    NOT NULL,
  sid         Serial    NOT NULL,
  dateListed  DATE,
  status      TEXT     DEFAULT 'AVAILABLE'    NOT NULL,
  rate        NUMERIC,
  startDate   DATE,
  endDate     DATE,
  UNIQUE (resID, "room#"),
  UNIQUE (subID, sid),
  FOREIGN KEY ("room#", resID) REFERENCES Room_In12 ("room#", resID)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  FOREIGN KEY (subID, sid) REFERENCES Subletter (subID, sid)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Application (
  applicationID   Serial  PRIMARY KEY,
  listingID       Serial  NOT NULL,
  applicantID     Serial  NOT NULL,
  sid             Serial  NOT NULL,
  introduction    TEXT,
  FOREIGN KEY (listingID) REFERENCES Listing (listingID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (applicantID, sid) REFERENCES Applicant (applicantID, sid)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS partOf (
  applicationID  Serial,
  documentID      Serial,
  PRIMARY KEY (applicationID, documentID),
  FOREIGN KEY (applicationID) REFERENCES Application (applicationID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (documentID) REFERENCES Supporting_Document123 (documentID)
);

CREATE TABLE IF NOT EXISTS Viewing_Schedule123 (
  viewingID       Serial    PRIMARY KEY,
  applicationID   Serial    NOT NULL,
  viewingDate     Date      NOT NULL,
  viewingTime     TIME      NOT NULL,
  UNIQUE (applicationID),
  FOREIGN KEY (applicationID) REFERENCES Application (applicationID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Viewing_Schedule4 (
  applicationID   Serial  PRIMARY KEY,
  address         TEXT,
  UNIQUE (applicationID),
  FOREIGN KEY (applicationID) REFERENCES Application (applicationID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Populate tables

INSERT INTO "user" (sid, "phone#", name, gender, email) VALUES
  (11111111,2367889977,'Yuka Ma','F','yukama1@student.ubc.ca'),
  (22222222,6042388080,'Michael Jackson','M',NULL),
  (33333333,6045550160,'Elvis Presley','M','elvispresley@gmail.com'),
  (44444444,6049678950,'Taylor Swift','F','tswizzle@outlook.com'),
  (55555555,2505947298,'Justin Bieber','M','babybabybaby@outlook.com'),
  (66666666,2504287200,'Whitney Houston','F',NULL),
  (77777777,6045213212,'Lady Gaga','F','rorororomance@gmail.com'),
  (88888888,6044084808,'Dua Lipa','F','dualipaleviting@student.ubc.ca'),
  (99999999,6042987793,'Bruno Mars','M','gotmepayingherrent@protonmail.com');

INSERT INTO Subletter (sid) VALUES
  (11111111),
  (22222222),
  (33333333),
  (44444444),
  (55555555);

INSERT INTO Applicant (sid) VALUES
  (99999999),
  (66666666),
  (77777777),
  (88888888),
  (55555555);

INSERT INTO Supporting_Document4 (document, type) VALUES
  ('Bruno''s study permit','study permit'),
  ('Bruno''s student id photocopy','student id'),
  ('Gaga''s passport','government id'),
  ('Justin''s passport','government id'),
  ('Justin''s BC id','government id');

INSERT INTO Supporting_Document123 (documentID, applicantID, sid, document) VALUES
  (1,1,99999999,'Bruno''s study permit'),
  (2,1,99999999,'Bruno''s student id photocopy'),
  (3,3,77777777,'Gaga''s passport'),
  (4,5,55555555,'Justin''s passport'),
  (5,5,55555555,'Justin''s BC id');

INSERT INTO Residence (resID, buildingName, streetAddress, minAge) VALUES
  (1,'Place Vanier','1935 Lower Mall',NULL),
  (2,'Totem Park','2525 West Mall',NULL),
  (3,'Orchard Commons','6363 Agronomy Road',NULL),
  (4,'Brock Commons-Tallwood House','5960 Student Union Blvd.',19),
  (5,'Ritsumeikan-UBC House','6363 Agronomy Road',18);

INSERT INTO Room_In5 (numRooms, numBathrooms) VALUES
  (1,0),
  (2,1),
  (3,2),
  (4,2),
  (6,3);

INSERT INTO Room_In34 (roomType, hasKitchen, numRooms) VALUES
  ('A','f',1),
  ('B','t',2),
  ('C','t',3),
  ('D','t',4),
  ('E','t',6);

INSERT INTO Room_In12 ("room#", resID, roomType, gender) VALUES
  (101,1,'A','F'),
  (202,1,'C','M'),
  (304,1,'C','F'),
  (408,2,'D','M'),
  (1210,4,'B','U');

INSERT INTO Amenity (type) VALUES
  ('Front desk'),
  ('Gym'),
  ('Music room'),
  ('Study room'),
  ('Cafeteria');

INSERT INTO has (amenityType, resID) VALUES
  ('Front desk',1),
  ('Gym',1),
  ('Music room',1),
  ('Study room',4),
  ('Cafeteria',5);

INSERT INTO Listing (listingID, "room#", resID, subID, sid, dateListed, status, rate, startDate, endDate) VALUES
  (1,101,1,1,11111111,'2022-07-24','AVAILABLE',1800,'2022-08-01','2022-09-01'),
  (2,202,1,2,22222222,'2022-08-01','CLOSED',1100,'2022-08-31',NULL),
  (3,304,1,3,33333333,'2022-06-09','AVAILABLE',1150,'2022-07-21','2022-08-30'),
  (4,408,2,4,44444444,'2022-07-20','AVAILABLE',975,'2022-09-01','2023-04-01'),
  (5,1210,4,5,55555555,'2022-08-05','AVAILABLE',1300,'2022-10-01','2022-12-31');

INSERT INTO Application (applicationID, listingID, applicantID, sid, introduction) VALUES
  (1,1,5,55555555,'It''s Justin!'),
  (2,5,1,99999999,'Hey, it''s Bruno Mars'),
  (3,3,1,99999999,'Get ME paying your rent!'),
  (4,4,1,99999999,'24K magic in the air baby.'),
  (5,1,3,77777777,'I''m interested, please call me!');

INSERT INTO partOf (applicationID, documentID) VALUES
  (1,4),
  (2,1),
  (3,1),
  (3,2),
  (5,3);

INSERT INTO Viewing_Schedule123 (viewingID, applicationID, viewingDate, viewingTime) VALUES
  (1,1,'2022-07-27','09:00'),
  (2,2,'2022-09-20','14:30'),
  (3,3,'2022-06-15','11:15'),
  (4,4,'2022-08-30','10:00'),
  (5,5,'2022-07-27','09:00');

INSERT INTO Viewing_Schedule4 (applicationID, address) VALUES
  (1,'1935 Lower Mall'),
  (2,'5960 Student Union Blvd.'),
  (3,'1935 Lower Mall'),
  (4,'2525 West Mall'),
  (5,NULL);
