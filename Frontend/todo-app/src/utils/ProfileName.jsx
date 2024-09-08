const ProfileName = (name) => {
  if (!name) return "??";
  let nameInitals = "";
  let initials = name.split(" ");
  for (let i = 0; i < Math.min(initials.length, 2); i++) {
    nameInitals += initials[i][0];
  }
  return nameInitals.toUpperCase();
};

export default ProfileName;
