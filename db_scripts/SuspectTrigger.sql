CREATE TRIGGER SuspectAuditTrigger
ON Suspects
AFTER INSERT, DELETE, UPDATE
AS
BEGIN
    DECLARE @TypeOfChange VARCHAR(10);
    DECLARE @UserId VARCHAR(100);

    IF EXISTS (SELECT *
        FROM inserted) AND EXISTS (SELECT *
        FROM deleted)
        SET @TypeOfChange = 'UPDATE';
    ELSE IF EXISTS (SELECT *
    FROM inserted)
        SET @TypeOfChange = 'INSERT';
    ELSE IF EXISTS (SELECT *
    FROM deleted)
        SET @TypeOfChange = 'DELETE';

    INSERT INTO SuspectAudit
        (UserId, SuspectId, SuspectName, TypeOfChange, Date)
    SELECT
        @UserId,
        ISNULL(inserted.SuspectId, deleted.SuspectId),
        ISNULL(inserted.SuspectName, deleted.SuspectName),
        @TypeOfChange,
        GETDATE()
    FROM inserted
        FULL OUTER JOIN deleted ON inserted.SuspectId = deleted.SuspectId;
END;