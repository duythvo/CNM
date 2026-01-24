import { Sequelize } from "sequelize";

const sequelize = new Sequelize("shopdb", "root", "sapassword", {
  host: "localhost",
  dialect: "mariadb",
});

export default sequelize;
