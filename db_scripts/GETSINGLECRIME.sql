-- Inserting data into the [User] table
INSERT INTO [User]
  (UserId, FirstName, LastName, Email, Age, Username, Password, Role, Registration_Date)
VALUES
  ('1', 'John', 'Doe', 'john.doe@example.com', 30, 'johndoe', 'password123', 'Admin', '2024-01-01'),
  ('2', 'Jane', 'Smith', 'jane.smith@example.com', 25, 'janesmith', 'abc123', 'User', '2024-01-15'),
  ('3', 'Michael', 'Johnson', 'michael.johnson@example.com', 35, 'michaelj', 'pass456', 'User', '2024-02-10');
-- Add more records as needed...

-- Inserting data into the Crimes table
INSERT INTO Crimes
  (CrimeId, ReporterID, CrimeType, Location, Date, Time, Description, CreatedAt, UpdatedAt)
VALUES
  ('1', '1', 'Robbery', 'Main Street', '2024-03-05', '15:30:00', 'Armed robbery at a convenience store', '2024-03-05', '2024-03-06'),
  ('2', '2', 'Burglary', 'Oak Avenue', '2024-04-10', '09:00:00', 'Break-in at a residential property', '2024-04-10', '2024-04-11'),
  ('3', '1', 'Assault', 'Elm Street', '2024-04-20', '18:45:00', 'Physical altercation outside a bar', '2024-04-20', '2024-04-21');
-- Add more records as needed...

-- Inserting data into the Suspects table
INSERT INTO Suspects
  (SuspectId, CaseId, SuspectName, Age, Gender, Height, Weight)
VALUES
  ('1', '1', 'Jack Johnson', 25, 'M', '5 10', '180 lbs'),
  ('2', '2', 'Emily Davis', 30, 'F', '5 6', '140 lbs'),
  ('3', '3', 'Mark Wilson', 40, 'M', '6 2', '200 lbs');
-- Add more records as needed...

-- Inserting data into the Crime_Suspect table to associate suspects with crimes
INSERT INTO Crime_Suspect
  (SuspectId, CrimeID)
VALUES
  ('1', '1'),
  ('2', '2'),
  ('3', '3');
INSERT INTO Crime_Suspect
  (SuspectId, CrimeID)
VALUES
  ('1', '3')
-- Add more records as needed...
-- Inserting data into the Victims table
INSERT INTO Victims
  (VictimId, VictimName, Age, Gender, Height, Weight)
VALUES
  ('1', 'Alice Johnson', 28, 'F', '5 6', '140 lbs'),
  ('2', 'Robert Smith', 45, 'M', '6 0', '180 lbs'),
  ('3', 'Emily Wilson', 32, 'F', '5 8', '150 lbs');
-- Add more records as needed...

-- Inserting data into the Crime_Victim table to associate victims with crimes
INSERT INTO Crime_Victim
  (VictimId, CrimeId)
VALUES
  ('1', '1'),
  ('2', '2'),
  ('3', '3');


INSERT INTO Crime_Victim
  (VictimId, CrimeId)
VALUES
  ('1', '3')

INSERT INTO Crime_Evidence
  (EvidenceId, CrimeId)
VALUES
  ('1', '3');
Select *
from Evidence;
-- Add more records as needed...
-- Inserting data into the Evidence table
INSERT INTO Evidences
  (EvidenceId, EvidenceType, Description)
VALUES
  ('1', 'Fingerprint', 'Fingerprint found at the crime scene'),
  ('2', 'DNA Sample', 'DNA sample collected from the crime scene'),
  ('3', 'Surveillance Footage', 'Surveillance footage showing the suspect at the scene');

-- Add more records as needed...

-- Inserting data into the Crime_Evidence table to associate evidence with crimes
INSERT INTO Crime_Evidence
  (CrimeId, EvidenceId)
VALUES
  ('1', '1'),
  ('2', '2'),
  ('3', '3');

-- Add more records as needed...
select * from Officers;
-- Inserting data into the Evidence_Officer table
-- Inserting data into the Officers table
INSERT INTO Officers (OfficerId, Age, OfficerName, Gender, Height, Weight)
VALUES
('1', 35, 'Officer Smith', 'M', '6 0', '180 lbs'),
('2', 28, 'Officer Johnson', 'F', '5 8', '160 lbs'),
('3', 40, 'Officer Williams', 'M', '6 2', '190 lbs');
-- Add more records as needed...

INSERT INTO Evidence_Officer
  (OfficerId, EvidenceId)
VALUES
  ('1', '1'),
  -- Associate Officer O001 with Evidence E001
  ('2', '2'),
  -- Associate Officer O002 with Evidence E002
  ('3', '3');

INSERT INTO Crime_Officer
  (OfficerId, CrimeId)
VALUES
  ('1', '4'),
  -- Associate Officer O001 with Evidence E001
  ('2', '2'),
  -- Associate Officer O002 with Evidence E002
  ('3', '3');
-- Associate Officer O003 with Evidence E003
-- Add more records as needed...

select *
from Crime_Officer;

SELECT
  C.CrimeID,
  C.Description,
  C.Date,
  S.SuspectName,
  S.SuspectId,
  CrimeType
FROM
  Crimes C
  JOIN Crime_Suspect CS ON C.CrimeID = CS.CrimeID
  JOIN Suspects S ON CS.SuspectID = S.SuspectID
where s.SuspectID='1'

select *from [user];
select *from Crimes;
select *from Crime_Officer_Evidence;
--Query 1
select * from Crimes;

Select username as ReporterName, Location, CrimeType, Date, Time, Description,OfficerName as HandledBy
from
  Crimes C left join [User] U on C.ReporterID=U.UserId left join Crime_Officer_Evidence COE
  on COE.crimeId=C.crimeId left join Officers O on o.OfficerId=COE.OfficerId where C.CrimeId='dAv4XWs0qjOZBrLNlL4M4'
;
--Query 2 
select S.SuspectId, SuspectName, Age, Gender, Height, Weight
from
  Crimes C join
  Crime_suspect CS on C.CrimeId=CS.CrimeId
  join Suspects S on S.SuspectId=CS.SuspectID
where C.CrimeId='3'

--Query 3
select V.VictimId, VictimName, Age, Gender, Height, Weight
from
  Crimes C join
  Crime_Victim CV on C.CrimeId=CV.CrimeId
  join Victims V on V.VictimId=CV.VictimID
where C.CrimeId='3'
--Query 4
select E.EvidenceId, E.EvidenceType, E.Description,OfficerName as CollectedBy
from
  Crimes C join
  Crime_Officer_Evidence COE on C.CrimeId=COE.CrimeId
  join Evidences E on E.EvidenceId=COE.EvidenceID
  JOIN Officers O on O.OfficerId=COE.OfficerId where C.CrimeId='3'

select * from  Evidence_Officer;
