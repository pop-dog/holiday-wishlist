export const displayGender = (g) => {
    switch (g) {
      case 'boy': return 'Boy';
      case 'girl': return 'Girl';
      default: return '';
    }
}
  
export const displayAge = (a) => {
    let age = parseInt(a);
    if (isNaN(age) || age === 0) return '';
    else return age + (age === 1 ? ' year' : ' years') + ' old';
}

export const displayNum = (n) => {
  let num = parseInt(n);
  if (isNaN(num)) return '';
  else return num;
}

export const asNum = (n) => {
  if (!isNaN(n)) return n;
  else {
    let num = parseInt(n);
    if (isNaN(num)) return 0;
    else return num;
  }
}