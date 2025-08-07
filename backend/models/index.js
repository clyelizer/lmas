const User = require('./user');
const SchoolClass = require('./schoolClass');
const Grade = require('./grade');
const BulletinStructure = require('./bulletinStructure');

// Relations
User.belongsTo(SchoolClass, { foreignKey: 'current_class_id', as: 'current_class' });
SchoolClass.hasMany(User, { foreignKey: 'current_class_id', as: 'students' });
Grade.belongsTo(User, { foreignKey: 'student_id', as: 'student' });
User.hasMany(Grade, { foreignKey: 'student_id', as: 'grades' });
BulletinStructure.belongsTo(SchoolClass, { foreignKey: 'school_class_id', as: 'school_class' });
SchoolClass.hasOne(BulletinStructure, { foreignKey: 'school_class_id', as: 'bulletin_structure' });

module.exports = {
  User,
  SchoolClass,
  Grade,
  BulletinStructure,
};
