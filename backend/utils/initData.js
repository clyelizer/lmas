const { SchoolClass, BulletinStructure } = require('../models');

const createDefaultSchoolClasses = async () => {
  const defaultClasses = [
    '10e', '11e Sc', '11e L', '11e SES', '11e SS',
    '12e SE', '12e EXP', '12e SEco', '12e SS',
    'Terminale C', 'Seconde A',
  ];

  for (const className of defaultClasses) {
    const existingClass = await SchoolClass.findOne({ where: { name: className } });
    if (!existingClass) {
      await SchoolClass.create({ name: className });
    }
  }

  // Structures de bulletin par défaut
  const defaultStructures = [
    {
      className: 'Terminale C',
      subjects_part1: 'MATHS,PHYSIQUE,CHIMIE,PHILOSOPHIE,ANGLAIS,SVT',
      subjects_part2: 'E.C.M,EPS,INFORMATIQUE,CONDUITE',
    },
    {
      className: 'Seconde A',
      subjects_part1: 'MATHS,FRANCAIS,ANGLAIS,HIST-GEO,PHYSIQUE-CHIMIE,SVT',
      subjects_part2: 'E.C.M,EPS,LV2,ART PLASTIQUE',
    },
  ];

  for (const struct of defaultStructures) {
    const schoolClass = await SchoolClass.findOne({ where: { name: struct.className } });
    if (schoolClass && !await BulletinStructure.findOne({ where: { school_class_id: schoolClass.id } })) {
      await BulletinStructure.create({
        school_class_id: schoolClass.id,
        subjects_part1: struct.subjects_part1,
        subjects_part2: struct.subjects_part2,
      });
    }
  }
};

module.exports = { createDefaultSchoolClasses };
