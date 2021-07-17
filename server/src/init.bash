# sequelize model:generate --name Users \
# --attributes email:string,password:string,firstName:string,lastName:string,benchmark:string

# sequelize model:generate --name Snapshots \
# --attributes title:string,benchmark:string,notes:string,total:number,specifiedDate:date,userId:integer

# sequelize model:generate --name Accounts \
# --attributes location:string,type:string,total:decimal,snapshotId:integer

# sequelize model:generate --name Holdings \
# --attributes title:string,ticker:string,category:string,total:decimal,expenseRatio:decimal,accountId:integer

# sequelize seed:generate --name users
# sequelize db:seed:all

# npm run sequelize -- db:seed:all