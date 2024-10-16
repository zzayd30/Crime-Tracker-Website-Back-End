

CREATE TABLE [User]
(
    UserId VARCHAR(30) PRIMARY KEY,
    FirstName VARCHAR(20),
    LastName VARCHAR(20),
    Email VARCHAR(30) UNIQUE,
    Age INT,
    Username VARCHAR(50) UNIQUE,
    Password VARCHAR(60) NOT NULL,
    Role VARCHAR(10) NOT NULL,
    Registration_Date Date
);
CREATE TABLE Crimes
(
    CrimeId varchar(30) PRIMARY KEY,
    ReporterID varchar(30),
    CrimeType varchar(30),
    Location varchar(30),
    Date Date,
    Time Time,
    Description varchar(1000),
    CreatedAt DATE,
    UpdatedAt Date
);

ALTER TABLE crimes
ADD CONSTRAINT fk_UserId
FOREIGN KEY (ReporterId)
REFERENCES [USER](UserId)
ON UPDATE CASCADE
ON DELETE SET NULL;

CREATE TABLE Suspects
(
    SuspectId Varchar(30) PRIMARY KEY,
    SuspectName varchar(50),
    Age int,
    Gender char(1),
    Height varchar(10),
    Weight varchar(10)
);

CREATE TABLE Crime_Suspect
(
    SuspectId varchar(30),
    CrimeID varchar(30)
);

ALTER TABLE Crime_Suspect
ADD CONSTRAINT fk_Crime
FOREIGN KEY (CrimeId)
REFERENCES crimes(crimeId)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE Crime_Suspect
ADD CONSTRAINT fk_suspect
FOREIGN KEY (SuspectID)
REFERENCES Suspects(SuspectId)
ON UPDATE CASCADE
ON DELETE CASCADE;


CREATE TABLE Victims
(
    VictimId Varchar(30) PRIMARY KEY,
    VictimName Varchar(30),
    Age int,
    Gender varchar(5),
    Height varchar(10),
    Weight varchar(10)
)
CREATE TABLE Crime_Victim
(
    VictimId VARCHAR(30),
    CrimeId VARCHAR(30)
);

ALTER TABLE Crime_Victim
ADD CONSTRAINT fk_Crime_Victim
FOREIGN KEY (CrimeId)
REFERENCES crimes(crimeId)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE Crime_Victim
ADD CONSTRAINT fk_Victim
FOREIGN KEY (VictimId)
REFERENCES Victims(VictimId)
ON UPDATE CASCADE
ON DELETE CASCADE;

CREATE TABLE Evidences
(
    EvidenceId varchar(30) Primary Key,
    EvidenceType varchar(100),
    Description varchar(100),
);
CREATE TABLE OFFICERS
(
    OfficerId VARCHAR(30) PRIMARY KEY,
    Age INT,
    OfficerName VARCHAR(50),
    Gender CHAR(5),
    Height VARCHAR(10),
    Weight VARCHAR(10)
);
CREATE TABLE Crime_Officer_Evidence
(
    OfficerId VARCHAR(30),
    CrimeId VARCHAR(30),
    EvidenceId VARCHAR(30)
)
ALTER TABLE Crime_Officer_Evidence
ADD CONSTRAINT fk_OfficerId_relation
FOREIGN KEY (OfficerId)
REFERENCES Officers(OfficerId)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE Crime_Officer_Evidence
ADD CONSTRAINT fk_CrimeId_relation
FOREIGN KEY (CrimeId)
REFERENCES Crimes(CrimeId)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE Crime_Officer_Evidence
ADD CONSTRAINT fk_EvidenceId_Relation
FOREIGN KEY (EvidenceId)
REFERENCES Evidences(EvidenceId)
ON UPDATE CASCADE
ON DELETE CASCADE;

CREATE TABLE SuspectAudit
(
    AuditId INT PRIMARY KEY IDENTITY(1,1),
    UserId VARCHAR(100),
    SuspectId VARCHAR(30),
    SuspectName VARCHAR(50),
    TypeOfChange VARCHAR(10),
    Date DATETIME
);
CREATE TABLE VictimAudit
(
    AuditId INT PRIMARY KEY IDENTITY(1,1),
    UserId VARCHAR(100),
    VictimId VARCHAR(30),
    VictimName VARCHAR(50),
    TypeOfChange VARCHAR(10),
    Date DATETIME
);