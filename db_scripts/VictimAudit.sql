CREATE VIEW VictimAuditView AS select Username,VictimId,VictimName,TypeOfChange,Date FROM VictimAudit SA left join [User] U on Sa.UserId=U.UserId;
