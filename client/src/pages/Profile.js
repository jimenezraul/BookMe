import { Divider, Card, Avatar } from "react-daisyui";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container mt-10 mx-auto'>
        <div className='flex flex-wrap justify-center'>
          <div className='w-full lg:w-1/2 flex justify-center'>
            <Card className='bg-base-300 mb-2 shadow-md w-full max-w-lg'>
              <Card.Body className='w-full'>
                <Avatar
                  color='primary'
                  size='md'
                  shape='circle'
                  className='flex justify-center'
                  src={user?.picture.replace("s96-c", "s384-c", true)}
                  referrerPolicy='no-referrer'
                />
                <h1 className='text-center text-3xl font-bold'>
                  {user?.given_name} {user?.family_name}
                </h1>
              </Card.Body>
            </Card>
          </div>
          <div className='w-full lg:w-1/2'>
            <Card className='bg-base-300 mb-2 shadow-md w-full max-w-lg'>
              <Card.Body className='w-full'>
                <h1 className='text-center text-3xl font-bold'>
                  Appointments
                </h1>
                <Divider />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
