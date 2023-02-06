import { Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ISealabsPayOTPProps } from "../../interfaces/Components";

const SealabsPayOTP: React.FC<ISealabsPayOTPProps> = ({ ...props }) => {
  const {
    iframeUrl,
    setIframeUrl,
    setRedirectParams,
    setParams,
    params,
    redirected,
    setRedirected,
  } = props;

  useEffect(() => {
    if (redirected >= 1) {
      const searchParams = new URLSearchParams(params);
      let message = searchParams.get("message");
      let status = searchParams.get("status");
      if (message && status) {
        setRedirectParams({ message, status });
        setRedirected(0);
        setIframeUrl("");
      }
    }
  }, [redirected, params]);

  return (
    <>
      <Center mt={8}>
        <iframe
          title="Sealabs OTP"
          src={iframeUrl}
          width={"100%"}
          height={"800px"}
          hidden={redirected >= 1}
          onLoad={(e) => {
            setParams(e.currentTarget.contentWindow?.location.search);
            setRedirected(redirected + 1);
          }}
        ></iframe>
      </Center>
    </>
  );
};

export default SealabsPayOTP;
