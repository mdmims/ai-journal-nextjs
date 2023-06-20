import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
