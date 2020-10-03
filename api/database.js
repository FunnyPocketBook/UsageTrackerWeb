
const seq = require("sequelize");
const { Sequelize, DataTypes, Op } = seq;
const config = require("./config.js");


const sequelize = new Sequelize(
  config.default.database,
  config.default.dbUser,
  config.default.dbPassword,
  {
    host: config.default.host,
    dialect: "mariadb"
  }
);

const Program = sequelize.define(
  "Program",
  {
    ProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    User: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Elapsed: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

const Timerange = sequelize.define(
  "Timerange",
  {
    TimerangeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    End: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    NextProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PrevProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

Timerange.belongsTo(Program, {
  foreignKey: "ProgramId",
  targetKey: "ProgramId"
});
Program.hasMany(Timerange, { foreignKey: "ProgramId", targetKey: "ProgramId" });

export {
  sequelize,
  Program,
  Timerange,
  Op
};