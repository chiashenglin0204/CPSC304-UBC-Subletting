CREATE TABLE IF NOT EXISTS "user" (
  sid     Integer   PRIMARY KEY,
  "phone#"  TEXT      NOT NULL,
  name    TEXT      NOT NULL,
  gender  CHAR(1)   NOT NULL,
  email   TEXT,
  UNIQUE ("phone#")
);

CREATE TABLE IF NOT EXISTS Subletter (
  subID   Serial UNIQUE, 
  sid     Integer,
  PRIMARY KEY (subID, sid),
  FOREIGN KEY (sid) REFERENCES "user" (sid)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Applicant (  
  applicantID   Serial,
  sid           Integer,
  PRIMARY KEY (applicantID, sid),
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
