// Step 4: Create a TrainersMock.js file containing mock trainer data.
import Trainer from './trainer';

export const mockTrainers = [
  new Trainer(
    1,
    "Dr. Aravind Swamy",
    "aravind.swamy@trainerapp.com",
    "+91 98450 12345",
    "Full-Stack Web Development",
    "React, Redux, Node.js, Express, MongoDB, Next.js"
  ),
  new Trainer(
    2,
    "Bhavna Patel",
    "bhavna.patel@trainerapp.com",
    "+91 97321 67890",
    "Cloud Solutions Architecture",
    "AWS, Microsoft Azure, Docker, Kubernetes, Terraform"
  ),
  new Trainer(
    3,
    "Chaitanya Rao",
    "chaitanya.rao@trainerapp.com",
    "+91 88990 11223",
    "Artificial Intelligence & ML",
    "Python, TensorFlow, PyTorch, Scikit-Learn, Deep Learning, NLP"
  ),
  new Trainer(
    4,
    "Divya Sharma",
    "divya.sharma@trainerapp.com",
    "+91 99001 88776",
    "Cybersecurity & Pentesting",
    "Ethical Hacking, Network Security, OWASP Top 10, Kali Linux"
  ),
  new Trainer(
    5,
    "Eshwar Prasad",
    "eshwar.prasad@trainerapp.com",
    "+91 94440 55667",
    "Mobile App Engineering",
    "Flutter, Dart, React Native, Swift, Kotlin, Android Studio"
  )
];
