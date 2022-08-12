import { Button, Card, Divider } from "react-daisyui";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='container mx-auto flex flex-col justify-center items-center p-3'>
        <Card className="bg-base-300 w-full max-w-md">
          <Card.Body className="w-full">
                      <h1 className='text-center text-3xl font-bold'>Login</h1>
                      <Divider />
            <div className='flex flex-col items-center justify-center'>
              <Button
                color='primary'
                className='w-full'
                onClick={() => loginWithPopup()}
              >
                Login
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
