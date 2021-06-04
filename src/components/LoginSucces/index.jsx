import React, { useEffect } from 'react';

export const LoginSucces = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1);
  }, []);
  return <div>Thanks for log in</div>;
};
