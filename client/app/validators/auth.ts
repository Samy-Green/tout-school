export const validateLogin = (login: string) => {
  if (login.length < 3) {
    return "Le login doit contenir au moins 3 caractères.";
  }

  if (!/^[a-zA-Z]/.test(login)) {
    return "Le login doit commencer par une lettre.";
  }

  if (!/[a-zA-Z0-9]$/.test(login)) {
    return "Le login doit finir par une lettre ou un chiffre.";
  }

  if (!/^[a-zA-Z0-9_.-]+$/.test(login)) {
    return "Le login ne peut contenir que des lettres, chiffres, points, underscores et tirets.";
  }

  return "";
};

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    return "Le mot de passe doit contenir au moins 8 caractères.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Le mot de passe doit contenir au moins une majuscule.";
  }

  if (!/[a-z]/.test(password)) {
    return "Le mot de passe doit contenir au moins une minuscule.";
  }

  if (!/[0-9]/.test(password)) {
    return "Le mot de passe doit contenir au moins un chiffre.";
  }

  if (!/[-.#@_?!,;]/.test(password)) {
    return "Le mot de passe doit contenir au moins un caractère spécial (-.#@_?!,;).";
  }

  return "";
};
