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
--    --> Supporting_Document1(documentID, applicantID, document)
CREATE TABLE Supporting_Document1 (
  documentID    Serial    PRIMARY KEY,
  applicantID   Serial    NOT NULL,
  document      TEXT      NOT NULL,
  FOREIGN KEY (applicantID) REFERENCES Applicant (applicantID)
);

CREATE TABLE Supporting_Document3 (
  document    TEXT    PRIMARY KEY,
  type        TEXT    NOT NULL
);

CREATE TABLE partOf (
  applicantID   Serial,
  documentID    Serial,
  PRIMARY KEY (applicantID, documentID),
  FOREIGN KEY (applicantID) REFERENCES Applicant (applicantID),
  FOREIGN KEY (documentID) REFERENCES Supporting_Document1 (documentID)
);

CREATE TABLE Residence (
  resID         Serial    PRIMARY KEY,
  buildingName  TEXT      NOT NULL,
  streetAddress TEXT      NOT NULL,
  minAge        Integer   NOT NULL,
  UNIQUE (buildingName, streetAddress)
);

-- Recombination:
-- Room_In1(room#, resID, roomType),
-- Room_In2(room#, resID, gender)
--    --> Room_In1(room#, resId, roomType, gender)
CREATE TABLE Room_In1 (
  room#     Integer,
  resID     Serial,
  roomType  CHAR(1)   NOT NULL,
  gender    CHAR(1)   NOT NULL,
  PRIMARY KEY (room#, resID),
  FOREIGN KEY (resID) REFERENCES Residence (resID) ON DELETE CASCADE
);

-- Recombination:
-- Room_In3(roomType, hasKitchen),
-- Room_In4(roomType, numRooms)
--    --> Room_In3(roomType, hasKitchen, numRooms)
CREATE TABLE Room_In3 (
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
  dateListed  DATE,
  status      TEXT,     DEFAULT 'AVAILABLE',
  rate        NUMERIC,
  startDate   DATE,
  endDate     DATE,
  UNIQUE (resID, room#),
  UNIQUE (subID),
  FOREIGN KEY (room#) REFERENCES Room_In1 (room#),
  FOREIGN KEY (resID) REFERENCES Residence (resID),
  FOREIGN KEY (subID) REFERENCES Subletter (subID)
);

CREATE TABLE Application (
  applicationID   Serial  PRIMARY KEY,
  listingID       Serial  NOT NULL,
  applicantID     Serial  NOT NULL,
  introduction    TEXT,
  FOREIGN KEY (listingID) REFERENCES Listing (listingID),
  FOREIGN KEY (applicantID) REFERENCES Applicant (applicantID)
);

-- Recombination:
-- Viewing_Schedule1(viewingID, applicationID),
-- Viewing_Schedule2(viewingID, date),
-- Viewing_Schedule3(viewingID, time)
--    --> Viewing_Schedule1(viewingID, applicationID, date, time)
CREATE TABLE Viewing_Schedule1 (
  viewingID       Serial    PRIMARY KEY,
  applicationID   Serial    NOT NULL,
  dateListed      Date      NOT NULL,
  viewingTime     TIME      NOT NULL,
  FOREIGN KEY (applicationID) REFERENCES Application (applicationID)
);

CREATE TABLE Viewing_Schedule4 (
  applicationID   Serial  PRIMARY KEY,
  address         TEXT,
  FOREIGN KEY (applicationID) REFERENCES Application (applicationID)
);
