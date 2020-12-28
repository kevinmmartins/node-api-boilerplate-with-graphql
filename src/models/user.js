import bcrypt from 'bcrypt'

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 40]
      }
    },
    role: {
      type: DataTypes.STRING
    }
  })

  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash()
  })

  User.prototype.generatePasswordHash = async function passwordHash() {
    const saltRounds = 10
    return await bcrypt.hash(this.password, saltRounds)
  }

  return User
}

export default user
