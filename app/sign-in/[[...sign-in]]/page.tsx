import { SignIn, SignUp } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
