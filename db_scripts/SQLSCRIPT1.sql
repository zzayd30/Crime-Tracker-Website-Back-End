delete from Crimes;
delete from Suspects;
delete from Crime_Suspect;
delete from Victims;
delete from Crime_Victim;
delete from Evidences;
delete from Crime_Evidence;
delete from OFFICERS;
delete from Crime_Officer;
delete from Evidence_Officer;
select *
from [user];
INSERT INTO [User]
    (UserId, FirstName, LastName, Email, Age, Username, Password, Role, Registration_Date)
VALUES
    ('1', 'John', 'Doe', 'john.doe@example.com', 25, 'johndoe', 'password1', 'user', '2024-05-04'),
    ('2', 'Jane', 'Smith', 'jane.smith@example.com', 30, 'janesmith', 'password2', 'admin', '2024-05-04'),
    ('3', 'Alice', 'Johnson', 'alice.johnson@example.com', 35, 'alicejohnson', 'password3', 'user', '2024-05-04'),
    ('4', 'Bob', 'Brown', 'bob.brown@example.com', 40, 'bobbrown', 'password4', 'user', '2024-05-04'),
    ('5', 'Emily', 'Davis', 'emily.davis@example.com', 28, 'emilydavis', 'password5', 'admin', '2024-05-04'),
    ('6', 'Michael', 'Wilson', 'michael.wilson@example.com', 32, 'michaelwilson', 'password6', 'user', '2024-05-04'),
    ('7', 'Samantha', 'Martinez', 'samantha.martinez@example.com', 27, 'samanthamartinez', 'password7', 'user', '2024-05-04'),
    ('8', 'David', 'Taylor', 'david.taylor@example.com', 45, 'davidtaylor', 'password8', 'admin', '2024-05-04'),
    ('9', 'Jessica', 'Lee', 'jessica.lee@example.com', 33, 'jessicalee', 'password9', 'user', '2024-05-04'),
    ('10', 'Matthew', 'Anderson', 'matthew.anderson@example.com', 29, 'matthewanderson', 'password10', 'user', '2024-05-04');


INSERT INTO Crimes
    (CrimeId, ReporterID, CrimeType, Location, Date, Time, Description, CreatedAt, UpdatedAt)
VALUES
    ('1', '1', 'Theft', 'Main Street', '2024-05-01', '12:30:00', 'Stolen purse', '2024-05-04', '2024-05-04'),
    ('2', '2', 'Assault', 'Park Avenue', '2024-05-02', '15:45:00', 'Physical altercation', '2024-05-04', '2024-05-04'),
    ('3', '3', 'Burglary', 'Elm Street', '2024-05-03', '09:00:00', 'Break-in at residence', '2024-05-04', '2024-05-04'),
    ('4', '4', 'Vandalism', 'Broadway', '2024-05-04', '18:20:00', 'Graffiti on buildings', '2024-05-04', '2024-05-04'),
    ('5', '5', 'Robbery', 'Oak Lane', '2024-05-05', '20:00:00', 'Armed robbery at store', '2024-05-04', '2024-05-04'),
    ('6', '6', 'Fraud', 'Maple Avenue', '2024-05-06', '11:10:00', 'Credit card fraud', '2024-05-04', '2024-05-04'),
    ('7', '7', 'Kidnapping', 'Cedar Street', '2024-05-07', '14:30:00', 'Child abduction', '2024-05-04', '2024-05-04'),
    ('8', '8', 'Homicide', 'Pine Road', '2024-05-08', '23:55:00', 'Murder investigation', '2024-05-04', '2024-05-04'),
    ('9', '9', 'Drug Trafficking', 'Willow Lane', '2024-05-09', '10:20:00', 'Narcotics distribution', '2024-05-04', '2024-05-04'),
    ('10', '10', 'Arson', 'Hillside Avenue', '2024-05-10', '08:40:00', 'Intentional fire', '2024-05-04', '2024-05-04');

INSERT INTO Suspects
    (SuspectId, SuspectName, Age, Gender, Height, Weight)
VALUES
    ('1', 'John Smith', 30, 'M', '5 10', '180 lbs'),
    ('2', 'Jane Doe', 25, 'F', '5 6', '150 lbs'),
    ('3', 'Michael Johnson', 35, 'M', '6 0', '200 lbs'),
    ('4', 'Emily Davis', 28, 'F', '5 5', '140 lbs'),
    ('5', 'David Brown', 40, 'M', '5 9', '170 lbs'),
    ('6', 'Sarah Wilson', 32, 'F', '5 8', '160 lbs'),
    ('7', 'Robert Martinez', 27, 'M', '5 11', '190 lbs'),
    ('8', 'Jessica Lee', 33, 'F', '5 7', '155 lbs'),
    ('9', 'Matthew Anderson', 29, 'M', '6 2', '180 lbs'),
    ('10', 'Samantha Taylor', 28, 'F', '5 4', '135 lbs');

INSERT INTO Crime_Suspect
    (SuspectId, CrimeID)
VALUES
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
    ('5', '5'),
    ('6', '6'),
    ('7', '7'),
    ('8', '8'),
    ('9', '9'),
    ('10', '10');

INSERT INTO Victims
    (VictimId, VictimName, Age, Gender, Height, Weight)
VALUES
    ('1', 'Alice Smith', 25, 'F', '5 6', '140 lbs'),
    ('2', 'Mark Johnson', 40, 'M', '6 0', '180 lbs'),
    ('3', 'Sarah Brown', 30, 'F', '5 4', '130 lbs'),
    ('4', 'Robert Davis', 35, 'M', '5 10', '170 lbs'),
    ('5', 'Emily Wilson', 28, 'F', '5 7', '150 lbs'),
    ('6', 'John Martinez', 45, 'M', '5 9', '160 lbs'),
    ('7', 'Jessica Lee', 33, 'F', '5 5', '135 lbs'),
    ('8', 'David Taylor', 38, 'M', '6 2', '190 lbs'),
    ('9', 'Samantha Anderson', 27, 'F', '5 8', '155 lbs'),
    ('10', 'Michael Harris', 32, 'M', '5 11', '175 lbs');

INSERT INTO Crime_Victim
    (VictimId, CrimeId)
VALUES
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
    ('5', '5'),
    ('6', '6'),
    ('7', '7'),
    ('8', '8'),
    ('9', '9'),
    ('10', '10');

INSERT INTO Evidences
    (EvidenceId, EvidenceType, Description)
VALUES
    ('1', 'Fingerprint', 'Fingerprint found at the crime scene'),
    ('2', 'Blood sample', 'Blood sample collected from the crime scene'),
    ('3', 'Security footage', 'Security footage capturing the crime event'),
    ('4', 'Weapon', 'Weapon used in the crime'),
    ('5', 'DNA evidence', 'DNA evidence linking suspect to the crime'),
    ('6', 'Footprint', 'Footprint found at the crime scene'),
    ('7', 'Eyewitness testimony', 'Eyewitness testimony of the crime event'),
    ('8', 'Digital evidence', 'Digital evidence recovered from suspect device'),
    ('9', 'Document', 'Document related to the crime'),
    ('10', 'Surveillance footage', 'Surveillance footage from nearby area capturing suspect');

INSERT INTO Crime_Evidence
    (EvidenceId, CrimeId)
VALUES
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
    ('5', '5'),
    ('6', '6'),
    ('7', '7'),
    ('8', '8'),
    ('9', '9'),
    ('10', '10');

INSERT INTO OFFICERS
    (OfficerId, Age, OfficerName, Gender, Height, Weight)
VALUES
    ('1', 35, 'John Smith', 'M', '6 0', '180 lbs'),
    ('2', 40, 'Jane Doe', 'F', '5 6', '150 lbs'),
    ('3', 45, 'Michael Johnson', 'M', '6 2', '190 lbs'),
    ('4', 30, 'Emily Davis', 'F', '5 5', '140 lbs'),
    ('5', 38, 'David Brown', 'M', '5 10', '170 lbs'),
    ('6', 32, 'Sarah Wilson', 'F', '5 8', '160 lbs'),
    ('7', 36, 'Robert Martinez', 'M', '5 11', '175 lbs'),
    ('8', 33, 'Jessica Lee', 'F', '5 7', '155 lbs'),
    ('9', 39, 'Matthew Anderson', 'M', '6 1', '185 lbs'),
    ('10', 34, 'Samantha Taylor', 'F', '5 4', '135 lbs');

INSERT INTO Crime_Officer
    (OfficerId, CrimeId)
VALUES
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
    ('5', '5'),
    ('6', '6'),
    ('7', '7'),
    ('8', '8'),
    ('9', '9'),
    ('10', '10');

INSERT INTO Evidence_Officer
    (OfficerId, EvidenceId)
VALUES
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
    ('5', '5'),
    ('6', '6'),
    ('7', '7'),
    ('8', '8'),
    ('9', '9'),
    ('10', '10');

select *
from officers;

INSERT INTO Crime_Officer_Evidence
    (OfficerId,CrimeId,EvidenceId)
values
    ('1', '1', '1'),
    ('2', '2', '2'),
    ('3', '3', '3'),
    ('4', '4', '4'),
    ('5', '5', '5'),
    ('6', '6', '6'),
    ('7', '7', '7'),
    ('8', '8', '8'),
    ('9', '9', '9'),
    ('10', '10', '10');

select *
from suspects
;

UPDATE SUSPECTS
SET SuspectName='Zohaib Saeed',Age='18',Gender='M',Height='5 10',Weight='80 Kgs'
where SuspectId='ccKoxHURrNY72amZwtxi5';

select *
from officers;

SELECT CONCAT(firstName, ' ', lastName) AS UserName
FROM [User];

select *
from suspects;

delete  from suspects where suspectid='1';

select * from Crime_suspect;
select * from VictimAudit;
select Username,SuspectId,SuspectName,TypeOfChange,Date FROM SuspectAudit SA left join [User] U on Sa.UserId=U.UserId;

select * from Officers;

select * from [user];


select * from SuspectAuditView;
select * from VictimAuditView;