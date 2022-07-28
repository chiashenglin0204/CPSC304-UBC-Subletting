-- Note: After discussion with TA, we chose to combine some of our decomposed
--       tables to reduce redundancy following a
--            R1(A,C), R2(A,B) -> R3(A,B,C)
--       format. This allows us to more easily reference keys of decomposed
--       relations when introducing a foreign key.

CREATE TABLE User (
  sid     Integer   PRIMARY KEY,
  phone#  TEXT      NOT NULL,
  name    TEXT      NOT NULL,
  gender  CHAR(1)   NOT NULL,
  email   TEXT,
  UNIQUE (phone#)
);

CREATE TABLE Subletter (
  subID   Serial,
  sid     Integer,
  PRIMARY KEY (subID, sid),
  FOREIGN KEY (sid) REFERENCES User (sid)
);

CREATE TABLE Applicant (
  applicantID   Serial,
  sid           Integer,
  PRIMARY KEY (applicantID, sid),
  FOREIGN KEY (sid) REFERENCES User (sid)
);

-- Recombination:
-- Supporting_Document1(documentID, applicantID),
-- Supporting_Document2(documentID, document)
-- Supporting_Document3(documentID, sid)
--    --> Supporting_Document1(documentID, applicantID, sid, document)
CREATE TABLE Supporting_Document123 (
  documentID    Serial    PRIMARY KEY,
  applicantID   Serial    NOT NULL,
  sid           Serial    NOT NULL,
  document      TEXT      NOT NULL,
  FOREIGN KEY (applicantID) REFERENCES Applicant (applicantID),
  FOREIGN KEY (sid) REFERENCES User(sid)
);

CREATE TABLE Supporting_Document4 (
  document    TEXT    PRIMARY KEY,
  type        TEXT    NOT NULL
);

CREATE TABLE Residence (
  resID         Serial    PRIMARY KEY,
  buildingName  TEXT      NOT NULL,
  streetAddress TEXT      NOT NULL,
  minAge        Integer,
  UNIQUE (buildingName, streetAddress)
);

-- Recombination:
-- Room_In1(room#, resID, roomType),
-- Room_In2(room#, resID, gender)
--    --> Room_In1(room#, resId, roomType, gender)
CREATE TABLE Room_In12 (
  room#     Integer,
  resID     Serial,
  roomType  CHAR(1)   NOT NULL,
  gender    CHAR(1)   NOT NULL,
  PRIMARY KEY (room#, resID),
  FOREIGN KEY (resID) REFERENCES Residence (resID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Recombination:
-- Room_In3(roomType, hasKitchen),
-- Room_In4(roomType, numRooms)
--    --> Room_In3(roomType, hasKitchen, numRooms)
CREATE TABLE Room_In34 (
  roomType    TEXT      PRIMARY KEY,
  hasKitchen  Boolean   NOT NULL,
  numRooms    Integer   NOT NULL
);

CREATE TABLE Room_In5 (
  numRooms      Integer   PRIMARY KEY,
  numBathrooms  Integer
);

CREATE TABLE Amenity (
  type    TEXT      PRIMARY KEY
);

CREATE TABLE has (
  amenityType   TEXT,
  resID         Serial,
  PRIMARY KEY (amentiyType, resID),
  FOREIGN KEY (amenityType) REFERENCES Amenity (type),
  FOREIGN KEY (resID) REFERENCES Residence (resID)
);

CREATE TABLE Listing (
  listingID   Serial    PRIMARY KEY,
  room#       Integer   NOT NULL,
  resID       Serial    NOT NULL,
  subID       Serial    NOT NULL,
  sid         Serial    NOT NULL,
  dateListed  DATE,
  status      TEXT     DEFAULT 'AVAILABLE'    NOT NULL,
  rate        NUMERIC,
  startDate   DATE,
  endDate     DATE,
  UNIQUE (resID, room#),
  UNIQUE (subID, sid),
  FOREIGN KEY (room#) REFERENCES Room_In1 (room#),
  FOREIGN KEY (resID) REFERENCES Residence (resID),
  FOREIGN KEY (subID) REFERENCES Subletter (subID),
  FOREIGN KEY (sid) REFERENCES User(sid)

);

CREATE TABLE Application (
  applicationID   Serial  PRIMARY KEY,
  listingID       Serial  NOT NULL,
  applicantID     Serial  NOT NULL,
  sid             Serial  NOT NULL,
  introduction    TEXT,
  FOREIGN KEY (listingID) REFERENCES Listing (listingID),
  FOREIGN KEY (applicantID) REFERENCES Applicant (applicantID),
  FOREIGN KEY (sid) REFERENCES User(sid)
);

CREATE TABLE partOf (
  applicationID  Serial,
  documentID      Serial,
  PRIMARY KEY (applicationID, documentID),
  FOREIGN KEY (applicationID) REFERENCES Application (applicationID),
  FOREIGN KEY (documentID) REFERENCES Supporting_Document1 (documentID)
);

-- Recombination:
-- Viewing_Schedule1(viewingID, applicationID),
-- Viewing_Schedule2(viewingID, viewingDate),
-- Viewing_Schedule3(viewingID, viewingTime)
--    --> Viewing_Schedule1(viewingID, applicationID, viewingDate, viewingTime)
CREATE TABLE Viewing_Schedule123 (
  viewingID       Serial    PRIMARY KEY,
  applicationID   Serial    NOT NULL,
  viewingDate     Date      NOT NULL,
  viewingTime     TIME      NOT NULL,
  FOREIGN KEY (applicationID) REFERENCES Application (applicationID)
);

CREATE TABLE Viewing_Schedule4 (
  applicationID   Serial  PRIMARY KEY,
  address         TEXT,
  FOREIGN KEY (applicationID) REFERENCES Application (applicationID)
);
