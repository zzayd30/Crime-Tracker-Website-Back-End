CREATE TRIGGER VictimAuditTrigger
ON Victims
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

    INSERT INTO VictimAudit
        (UserId, VictimId, VictimName, TypeOfChange, Date)
    SELECT
        @UserId,
        ISNULL(inserted.VictimId, deleted.VictimId),
        ISNULL(inserted.VictimName, deleted.VictimName),
        @TypeOfChange,
        GETDATE()
    FROM inserted
        FULL OUTER JOIN deleted ON inserted.VictimId = deleted.VictimId;
END;
