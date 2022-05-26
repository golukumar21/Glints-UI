export const getUserInitials = (fullname: any) => {
  let firstName = fullname.split(' ')[0];
  let lastName = '';
  if (fullname.split(' ')[1]) {
    lastName = fullname.split(' ')[1];
    if (lastName != '') {
      lastName = lastName[0].toUpperCase();
    }
  }
  return firstName[0].toUpperCase() + lastName;
};
