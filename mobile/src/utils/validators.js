import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('Le nom d’utilisateur est requis'),
  password: yup.string().min(6, 'Le mot de passe doit avoir au moins 6 caractères').required('Le mot de passe est requis'),
});

export const gradeSchema = yup.object().shape({
  student_id: yup.number().required('Étudiant requis'),
  subject: yup.string().required('Matière requise'),
  moy_cl: yup.number().min(0).max(20).required('Note de classe requise'),
  n_compo: yup.number().min(0).max(20).required('Note de composition requise'),
  coef: yup.number().min(1).required('Coefficient requis'),
  period: yup.string().required('Période requise'),
});

export const bulletinSchema = yup.object().shape({
  student_id: yup.number().required('Étudiant requis'),
  period: yup.string().required('Période requise'),
});
