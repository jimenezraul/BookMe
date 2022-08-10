import { Button, Card, Divider } from "react-daisyui";
import { idbPromise } from "../../utils/helpers";
import { getOrCreate } from "../../api/customer";
import { creditcardPayment } from "../../api/creditCardPayment";
import { useState } from "react";

const Payments = () => {
  const [loading, setLoading] = useState(false);
  async function handlePayment() {
    let service = await idbPromise("appointments", "get");
    let client = await idbPromise("guest", "get");
    service = service[0];
    setLoading(true);
    let customer;
    try {
      const response = await getOrCreate(client);
      customer = response;
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await creditcardPayment(service, customer);

      const redirectUrl = response.paymentLink.url;
      setLoading(false);
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <div className='container mt-5 flex justify-center'>
        <div className='w-full max-w-md'>
          <h1 className='text-center text-2xl font-bold'>Payments</h1>
          <Card className='bg-base-300 mb-10 p-5 rounded-xl mt-2'>
            <Card.Body className='p-5'>
              <Card.Title className='pb-5'>Payment Method</Card.Title>
              <Button
                onClick={handlePayment}
                className='w-full'
                type='button'
                variant='primary'
                loading={loading}
              >
                <i className='fa-solid fa-credit-card'></i>{" "}
                <span className='ml-2'>Credit Card</span>
              </Button>
              <Divider>or</Divider>
              <Button
                onClick={() => (window.location.href = "/cashapp-pay")}
                className='w-full bg-black'
                type='button'
              >
                <svg
                  className='h-6'
                  alt='Cash App Pay'
                  viewBox='0 0 312 46'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M7 22.2303c0-6.3812 0-9.5718 1.2419-12.0091a11.394 11.394 0 0 1 4.9793-4.9793C15.6585 4 18.8491 4 25.2303 4h1.5192c6.3812 0 9.5719 0 12.0092 1.2419a11.394 11.394 0 0 1 4.9793 4.9793c1.2419 2.4373 1.2419 5.6279 1.2419 12.0091v1.5192c0 6.3813 0 9.5719-1.2419 12.0092a11.3941 11.3941 0 0 1-4.9793 4.9793c-2.4373 1.2419-5.628 1.2419-12.0092 1.2419h-1.5192c-6.3812 0-9.5718 0-12.0091-1.2419a11.394 11.394 0 0 1-4.9793-4.9793C7 33.3214 7 30.1308 7 23.7495v-1.5192Z'
                    fill='#00D64F'
                  ></path>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M26.976 16.389c1.968 0 3.8542.7969 5.0868 1.8907.3116.2768.7782.2751 1.0707-.0214l1.4664-1.4872c.3094-.3139.2982-.8279-.036-1.1148-.984-.8459-2.305-1.6777-3.9309-2.2103l.4599-2.19c.0997-.4773-.2638-.9259-.7518-.9259h-2.8337a.7683.7683 0 0 0-.7512.6081l-.4142 1.9477c-3.7669.1882-6.9595 2.0677-6.9595 5.9242 0 3.3385 2.6415 4.7694 5.4294 5.7596 2.6414.9902 4.0351 1.3576 4.0351 2.7513 0 1.4309-1.3937 2.2746-3.4484 2.2746-1.8733 0-3.8356-.6182-5.3584-2.1196-.2987-.2947-.7766-.297-1.0753-.0022l-1.5757 1.5543c-.3083.3037-.3055.8031.0051 1.104 1.2285 1.1925 2.784 2.0559 4.5592 2.5394l-.4322 2.0289c-.1009.4756.2592.9242.7461.9282l2.8381.0214a.767.767 0 0 0 .7569-.6104l.4097-1.9505c4.5102-.2784 7.2706-2.7299 7.2706-6.3181 0-3.3014-2.7508-4.6956-6.0894-5.8329-1.9076-.6977-3.5589-1.1739-3.5589-2.6043 0-1.3937 1.5414-1.9448 3.0816-1.9448Z'
                    fill='white'
                  ></path>
                  <path
                    d='m74.9257 17.6908 1.9897-1.2528c.6264-.4053.7738-.9211.3316-1.5107-2.4687-3.353-6.0428-4.9742-10.0958-4.9742-7.5535 0-12.7488 5.5638-12.7488 13.5962 0 8.1062 5.1953 13.6699 12.8593 13.6699 4.4215 0 7.7745-1.8791 10.1327-5.1953.4053-.6264.2579-1.1422-.3685-1.5107l-2.0265-1.179c-.5895-.3317-1.1054-.2211-1.5107.3316-1.4001 1.9528-3.3898 3.1687-6.1901 3.1687-4.8269 0-7.8114-3.7951-7.8114-9.2852 0-5.4164 2.9477-9.2115 7.7377-9.2115 2.5423 0 4.6426.9948 6.1533 3.0214.4421.5527.958.7 1.5475.3316Zm18.4689 19.0494h2.2107c.7001 0 1.1054-.4053 1.1054-1.1053V23.2545c0-4.532-3.2056-6.4112-7.7745-6.4112-2.653 0-5.2322.7001-7.2219 1.7686-.6264.3316-.7369.8843-.4421 1.5107l.7 1.437c.3317.6633.8475.7738 1.5107.4422 1.6213-.8106 3.5373-1.2528 5.0848-1.2528 1.5844 0 3.4635.4422 3.4635 2.0634 0 1.8423-2.395 2.0265-5.1953 2.4318-2.616.3685-6.8533 1.1791-6.8533 5.9323 0 3.832 2.7634 6.0059 6.7428 6.0059 2.6898 0 4.3847-.958 5.5638-2.5055v1.0316c0 .6633.4053 1.0317 1.1054 1.0317Zm-1.3634-9.6168v2.2108c0 2.9108-2.1002 4.1636-4.3478 4.1636-1.8055 0-3.0582-.8106-3.0582-2.5424 0-1.8792 1.4738-2.3213 3.1687-2.6529 1.7318-.2948 3.353-.5159 4.2373-1.1791Zm9.4668 4.7531-1.069 1.2528c-.4419.5527-.4419 1.1054.111 1.5844 1.953 1.5844 4.606 2.4687 7.701 2.4687 5.121 0 8.364-2.5055 8.364-6.5586 0-3.832-2.948-5.1585-7.591-5.9691-2.173-.3685-4.347-.6632-4.347-2.2108 0-1.4001 1.547-1.916 3.316-1.916 1.916 0 3.684.6264 4.937 1.5107.553.4422 1.106.4422 1.548-.1105l1.031-1.2159c.479-.5527.479-1.1054-.11-1.5476-1.658-1.2527-4.09-2.3213-7.222-2.3213-4.2 0-7.885 1.8055-7.885 6.0796 0 4.09 3.463 5.269 7.038 5.8954 3.389.5896 4.79.8843 4.79 2.3582 0 1.6212-1.548 2.2844-3.611 2.2844-1.843 0-3.832-.479-5.417-1.6949-.589-.4421-1.142-.4421-1.584.1105Zm19.775 4.8637h2.469c.7 0 1.105-.4053 1.105-1.1053v-9.8748c0-2.9477 1.916-4.7163 4.422-4.7163 2.653 0 3.316 1.8791 3.316 3.9425v10.6486c0 .7.405 1.1053 1.105 1.1053h2.469c.7 0 1.105-.4053 1.105-1.1053V23.9178c0-4.1636-2.395-7.0745-6.485-7.0745-2.579 0-4.679 1.1422-5.932 2.874v-8.1798c0-.7001-.405-1.1054-1.105-1.1054h-2.469c-.7 0-1.105.4053-1.105 1.1054v24.0974c0 .7.405 1.1053 1.105 1.1053Zm49.021 0h3.169c.81 0 1.179-.5158.884-1.2896l-8.917-24.1342c-.221-.6264-.626-.8843-1.253-.8843h-3.942c-.626 0-1.032.2579-1.253.8843l-8.953 24.1342c-.295.7738.073 1.2896.884 1.2896h2.984c.627 0 1.069-.2947 1.253-.8843l1.916-5.6374h10.059l1.916 5.6374c.184.5896.627.8843 1.253.8843Zm-8.143-22.034 3.721 11.4223h-7.59l3.869-11.4223Zm18.767 2.5793h-2.469c-.7 0-1.105.4053-1.105 1.1054v23.6552c0 .7001.405 1.1054 1.105 1.1054h2.469c.7 0 1.105-.4053 1.105-1.1054v-7.8114c1.364 1.9897 3.574 2.9477 6.006 2.9477 5.306 0 8.733-4.4215 8.733-10.2064 0-5.748-3.427-10.1327-8.733-10.1327-2.395 0-4.642.9212-6.006 2.9109v-1.3633c0-.7001-.405-1.1054-1.105-1.1054Zm1.105 9.6905c0-3.353 1.695-6.0428 5.011-6.0428 3.243 0 4.827 2.7267 4.827 6.0428 0 3.353-1.584 6.1165-4.827 6.1165-3.279 0-5.011-2.7266-5.011-6.1165Zm21.924-9.6905h-2.469c-.7 0-1.105.4053-1.105 1.1054v23.6552c0 .7001.405 1.1054 1.105 1.1054h2.469c.7 0 1.105-.4053 1.105-1.1054v-7.8114c1.363 1.9897 3.574 2.9477 6.006 2.9477 5.306 0 8.733-4.4215 8.733-10.2064 0-5.748-3.427-10.1327-8.733-10.1327-2.395 0-4.643.9212-6.006 2.9109v-1.3633c0-.7001-.405-1.1054-1.105-1.1054Zm1.105 9.6905c0-3.353 1.695-6.0428 5.011-6.0428 3.243 0 4.827 2.7267 4.827 6.0428 0 3.353-1.584 6.1165-4.827 6.1165-3.279 0-5.011-2.7266-5.011-6.1165Zm33.513.2579h6.264c6.006 0 9.432-3.3161 9.432-8.4009 0-5.0479-3.463-8.4009-9.432-8.4009H234.77c-.7 0-1.106.4053-1.106 1.1054v24.0974c0 .7.406 1.1053 1.106 1.1053h2.69c.7 0 1.105-.4053 1.105-1.1053v-8.401Zm6.227-4.4584h-6.227v-7.885h6.227c2.911 0 4.495 1.4001 4.495 3.9057 0 2.5423-1.584 3.9793-4.495 3.9793Zm24.485 13.9647h2.211c.7 0 1.105-.4053 1.105-1.1053V23.2545c0-4.532-3.205-6.4112-7.774-6.4112-2.653 0-5.232.7001-7.222 1.7686-.626.3316-.737.8843-.442 1.5107l.7 1.437c.332.6633.847.7738 1.511.4422 1.621-.8106 3.537-1.2528 5.084-1.2528 1.585 0 3.464.4422 3.464 2.0634 0 1.8423-2.395 2.0265-5.195 2.4318-2.616.3685-6.854 1.1791-6.854 5.9323 0 3.832 2.764 6.0059 6.743 6.0059 2.69 0 4.385-.958 5.564-2.5055v1.0316c0 .6633.405 1.0317 1.105 1.0317Zm-1.363-9.6168v2.2108c0 2.9108-2.1 4.1636-4.348 4.1636-1.805 0-3.058-.8106-3.058-2.5424 0-1.8792 1.474-2.3213 3.169-2.6529 1.731-.2948 3.353-.5159 4.237-1.1791Zm9.331 13.1909-.442 1.6581c-.184.7001.037 1.2159.7 1.3633.516.1105 1.179.1842 1.99.1842 3.242 0 5.048-1.3633 7.001-6.5217l7-18.4231c.295-.7738-.073-1.2896-.884-1.2896h-2.69c-.626 0-1.031.2947-1.252.8843L284.32 30.808l-4.385-12.6382c-.221-.5896-.626-.8843-1.253-.8843h-2.947c-.811 0-1.143.5158-.848 1.2896l7.001 17.8704c-.884 2.3581-1.584 3.1687-2.985 3.1687-.221 0-.479 0-.7-.0737-.442-.1105-.773.1106-.958.7738Z'
                    fill='#fff'
                  ></path>
                </svg>
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Payments;
