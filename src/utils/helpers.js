export function removeGmailSuffix(email) {
    const regex = /@.*$/;
    if (email) {
      return email.replace(regex, '');
    }
    return null; 
  }

