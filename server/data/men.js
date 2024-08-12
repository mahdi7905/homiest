const professions = [
  "Mechanic",
  "Gardener",
  "Painter",
  "Chef",
  "Masonry",
  "Cleaning",
  "Laundry",
  "Wiring",
  "Carpentry",
];
const names = [
  "Muhammad",
  "Kabir",
  "Jamil",
  "Sani",
  "Usman",
  "Adam",
  "Sanusi",
  "Mansur",
  "Ahmad",
  "Abdullahi",
  "Abdulkareem",
  "Mustapha",
  "Yaser",
  "Salim",
  "Bukar",
  "Umar",
  "Talba",
  "Isah",
  "Yusuf",
  "Yahya",
  "Sharif",
  "Saleh",
  "Salihu",
];

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
];

const getRandomProfession = () =>
  professions[Math.floor(Math.random() * professions.length)];
const getRandomState = () => states[Math.floor(Math.random() * states.length)];
const getRandomName = () => names[Math.floor(Math.random() * names.length)];

const generateRandomRating = () => Math.floor(Math.random() * 5) + 1;

const generateRandomUser = function (id) {
  const profession = getRandomProfession();
  const bio =
    profession === "Carpentry"
      ? "I am a professional carpenter. I have several years of experience in carpentry. My goal is to produce pruducts of high quality and fashion."
      : profession === "Chef"
      ? "I enjoy cooking a lot. I have many delicate recipes and I can cook cuisines of various origin."
      : profession === "Cleaning"
      ? "My priorities have always been well coordination and to be organized. I enjoy seeing and keeping things tidy and clean. I am very detail oriented and I work precisely and efficiently."
      : profession === "Gardener"
      ? "The feelings and sensation at the garden is unmatched. I love being at the garden and taking care of it."
      : profession === "Laundry"
      ? "Cleanliness is next to Godliness. I can help you achieve just that. I am very efficient and I have several years of experience in doing laundries."
      : profession === "Masonry"
      ? "I am a professional mason. I am very detail oriented and I work very efficiently and precisely."
      : profession === "Mechanic"
      ? "My priority is to ensure efficiency in the work delivered by your machines. I have good reputation in this service and I have experience of over 10 years."
      : profession === "Painter"
      ? "Painting is not just a job to me, it is an art. I can make your place living be your comfort zone. A place you will never be afraid to host others."
      : profession === "Wiring"
      ? "I am very current in the system with the possession and knowledge of mordern wiring equipments. I can easily fix wiring problems and do it from scratch. "
      : null;
  const user = {
    _id: `${id}`,
    name: `${getRandomName()} ${getRandomName()}`,
    avatar: `http://localhost:4000/public/professions/${profession}.jpg`,
    profession,
    bio,
    charge: `${Math.floor(Math.random() * 1000) + 500}`,
    rating: generateRandomRating(),
    location: getRandomState(),
    recommendations: [],
  };

  // Adding recommendations
  const numRecommendations = 7;
  for (let i = 0; i < numRecommendations; i++) {
    const recommendation = {
      name: `${getRandomName()}`,
      avatar: "",
      comment: `${user.name} is a good lad. He is a good listener. I really enjoyed his service and I look forward to his service. I highly recommend him.`,
    };
    user.recommendations.push(recommendation);
  }

  return user;
};

const userList = Array.from({ length: 250 }, (_, index) =>
  generateRandomUser(index + 1)
);

module.exports = userList;
