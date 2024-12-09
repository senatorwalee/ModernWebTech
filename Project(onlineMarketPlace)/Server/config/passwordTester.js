import bcrypt from 'bcryptjs';
import User from '../Schema/userSchema';

// Test user creation
const testUser = async () => {
  const user = new User({
    username: 'testuser',
    email: 'test@example.com',
    password: 'plainpassword',
  });

  await user.save();
  console.log(`Saved user: ${JSON.stringify(user, null, 2)}`);
};

// Test login logic
const testLogin = async () => {
  const email = 'test@example.com';
  const plainPassword = 'plainpassword';

  const user = await User.findOne({ email });
  if (!user) {
    console.log('No user found');
    return;
  }

  const isMatch = await bcrypt.compare(plainPassword, user.password);
  console.log(`Password match: ${isMatch}`);
};

// Run tests
(async () => {
  await testUser();
  await testLogin();
})();

