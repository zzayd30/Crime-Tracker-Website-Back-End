
CREATE VIEW SuspectAuditView AS select Username,SuspectId,SuspectName,TypeOfChange,Date FROM SuspectAudit SA left join [User] U on Sa.UserId=U.UserId;
