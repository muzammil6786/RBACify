const ActivityLog =require("../models/ActivityLog");

const logActivity = async ({userId,action,}) => {

  const log =await ActivityLog.create({
      user: userId,
      action,
    });

};

module.exports =logActivity;